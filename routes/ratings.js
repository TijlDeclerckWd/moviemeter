var express = require('express');
var router = express.Router();
var User = require('../models/user');
var async = require('async');
var Rating = require('../models/rating');


router.get('/getRating/:userId/:movieId', function(req, res, next) {
    var userId = req.params.userId;
    var movieId = req.params.movieId;
    var rating = null;

    async.waterfall([
        findUser,
        populateUser
    ], function(err, user){
        if (err) {
            res.status(500).json({
                title: "An error occurred",
                error: err
            })
        }
        var match = user.ratings.filter(function(obj){
            return obj.movie.toString() === movieId
        });
        if (match[0]) {
            rating = match[0].rating
        }
        res.status(200).json({
            message: "success",
            rating: rating
        })
    });

    function findUser(callback){
        User.findById(userId, function(err, user){
            callback(null, user);
        })
    }

    function populateUser(user,callback){
        user.populate('ratings', function(err, user){
           callback(null, user)
        });
    }
});

router.post('/addRating', function(req, res, next) {
    var body = req.body;
    var newRating = new Rating({
        user: req.body.userId,
        movie: req.body.movieId,
        rating: req.body.rating
    });

    async.waterfall([
            saveRating,
            populateRating,
            addRatingToUser,
            addRatingToMovieAndAdjustAverageRating
        ], function (err, result) {
            if (err) {
                res.status(500).json({
                    title: "An error occurred",
                    error: err
                })
            }
            res.status(200).json({
                message: "success",
                obj: result
            })
        }
    );


    function saveRating(callback) {
        newRating.save(function(err, rating){
            callback(null, rating);
        });
    }
    function populateRating(rating, callback) {
        rating
            .populate('movie')
            .populate('user', function (err, rating) {
                callback(null, rating);
            })
    }
    function addRatingToUser(rating, callback) {
        rating.user.ratings.unshift(rating._id);
        rating.user.save(function(err){
            callback(null, rating);
        });
    }
    function addRatingToMovieAndAdjustAverageRating(rating, callback) {
        rating.movie.ratings.unshift(rating._id);
        rating.movie.populate('ratings', function(err, movie){
            rating.movie.averageRating = movie.ratings.reduce(function(sum, num){
                return sum + num.rating
            },0) / movie.ratings.length;

            rating.movie.save(function(err, movie){
                callback(null, rating)
            })
        })
    }
});


module.exports = router;