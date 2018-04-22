var express = require('express');
var router = express.Router();
var User = require('../models/user');
var async = require('async');
var Rating = require('../models/rating');
var Movie = require('../models/movie');


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
        User.findOne({'_id': userId}, function(err, user){
            callback(null, user);
        })
    }

    function populateUser(user,callback){
        user.populate('ratings', function(err, user){
            callback(null, user)
        });
    }
});

router.post('/addRating', function(req, res) {
    var newRating = new Rating({
        user: req.body.userId,
        movie: req.body.movieId,
        rating: req.body.rating
    });


    isItAnEdit(newRating);


    setTimeout(function() {
        console.log('entered ADD RATING');
        async.waterfall([
                saveRating,
                populateRating,
                addRatingToUser,
                addRatingToMovieAndAdjustAverageRating
            ], function (err, averageRating) {
                console.log(averageRating)
                if (err) {
                    res.status(500).json({
                        title: "An error occurred",
                        error: err
                    })
                }
                res.status(200).json({
                    message: "success",
                    obj: averageRating
                })
            }
        );

        function saveRating(callback) {
            console.log('entered function');
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
            rating.user.save(function(err, user){
                console.log(user);
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
                    callback(null, movie.averageRating)
                })
            })
        }
    }, 1000)

});

function isItAnEdit(newRating){
    console.log('entered isitanedit');
    Movie.findOne({'_id': newRating.movie})
        .populate({
            path: 'ratings',
            populate: [
                { path: 'movie' },
                { path: 'user' }
            ]
        })
        .exec(function(err, movie){
            // We want to find whether the current user has already rated the movie
            var oldRating = false;
            movie.ratings.forEach(function(obj, index) {
                console.log('USERID', obj.user._id.toString());
                console.log('newRATING USER', newRating.user);
                console.log('TEST', obj.user._id.toString() == newRating.user);
                // If the user of this array element is the same as the user who is giving the new rating
                // then we use this index to edit and delete the old rating IDS
                if(obj.user._id.toString() == newRating.user) {
                    console.log('user already rated');
                    var ratingId = obj._id.toString();
                    var index = obj.user.ratings.indexOf(ratingId);
                    console.log('INDEX1', index);
                    obj.user.ratings.splice(index,1);
                    console.log('INDEX2', index);
                    var index2 = obj.movie.ratings.indexOf(ratingId);
                    obj.movie.ratings.splice(index2, 1);
                    obj.movie.save(function(err, savedMovie){
                        obj.user.save(function(err, savedUser){
                            Rating.findOne({'_id': ratingId})
                                .remove(function(err){
                                if (err) {
                                    res.status(500).json({
                                        title: "An error occurred",
                                        error: err
                                    })
                                }

                            })
                        })
                    });
                }
            });
        })
}





module.exports = router;