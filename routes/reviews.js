var express = require('express');
var router = express.Router();
var Movie = require('../models/movie');
var User = require('../models/user');
var Review = require('../models/review');
var async = require('async');


router.post('/addReview', function(req, res, next){

    var newReview = new Review({
        user: req.body.userId,
        movie: req.body.movieId,
        content: req.body.review,
        rating: null
    });
    var review;

    async.waterfall([
        saveNewReview,
        addReviewToUser,
        addReviewToMovie,
        populateReviewDocument
    ], function (err, result) {
        if (err) {
            res.status(500).json({
                message: "An error occurred",
                obj: err
            })
        }
        console.log(review);
        res.status(200).json({
            message: "successful",
            obj: result
        })
    });

    function saveNewReview(callback) {
        newReview.save(function(err, newReview) {
            review = newReview;
            callback(null, review)
        })
    }
    function addReviewToUser(review, callback) {
        User.find({'_id': req.body.userId})
            .exec(function(err, user) {
                user[0].reviews.unshift(review._id);
                user[0].save(err, function(err, user) {
                    callback(null, user)
                })
            })
    }
    function addReviewToMovie(user, callback) {
        Movie.find({'_id': req.body.movieId}, function (err, movie) {
            movie[0].reviews.unshift(review._id);
            movie[0].save(function (err, movie) {
                callback(null);
            });
        })
    }
    function populateReviewDocument(callback) {
        User.populate(review, {
            path: 'user',
                select: ['firstName', 'lastName', 'ratings'],
                populate: {
                    path: 'ratings'
                }}

            , function(err, review){
            callback(null, review)
        })
    }
});

router.put('/editReview', function(req, res, next) {
   Review.find({'_id': req.body.reviewId}).exec(function(err, review){
       console.log(review);
       if (err) {
           res.status(500).json({
               message: "An error occurred",
               obj: err
           })
       }
       review[0].content = req.body.content;
       review[0].save(function(err, review){
           if (err) {
               res.status(500).json({
                   message: "An error occurred",
                   obj: err
               })
           }
           res.status(200).json({
               message: "successful",
               obj: review
           })
       })
   })
});


router.get('/getReviews/:id', function(req, res, next){
    var movieId = req.params.id;
    Movie.find({ '_id': movieId })
        .populate('reviews')
        .exec(function(err, movie){
            if (err) {
                res.status(500).json({
                    message: "An error occurred",
                    obj: err
                })
            }
            res.status(200).json({
                message: "successful",
                obj: movie
            })
        })
});

router.delete('/deleteReview/:reviewId', function(req, res, next) {
    var reviewId = req.params.reviewId;

    async.waterfall([
        function (callback) {
            Review.find({'_id': reviewId})
                .populate('user')
                .populate('movie')
                .exec(function(err, review){
                    callback(null, review)
                });
        },
        function (review, callback) {
            var index = review[0].user.reviews.indexOf(reviewId);
            review[0].user.reviews.splice(index, 1);
            review[0].user.save(function(err, user){
              callback(null, user, review)
            })
        },
        function (user, review, callback) {
            var index = review[0].movie.reviews.indexOf(reviewId);
            review[0].movie.reviews.splice(index, 1);
            review[0].movie.save(function(err, movie){
                callback(null, movie, index)
            });
        }
    ], function (err, result, index) {
        if (err) {
            res.status(500).json({
                message: "An error occurred",
                obj: err
            })
        }
        res.status(200).json({
            message: "successful",
            obj: index
        })
    });
});

// router.delete('/deleteReview/:reviewId', function(req, res, next){
//    var reviewId = req.params.reviewId;
//     Review.find({'_id': reviewId})
//         .populate('user')
//         .populate('movie')
//         .exec(function(err, review){
//             if (err) {
//                 res.status(500).json({
//                     message: "An error occurred",
//                     obj: err
//                 })
//             }
//             var index = review[0].user.reviews.indexOf(reviewId);
//             review[0].user.reviews.splice(index, 1);
//             review[0].user.save(function(err, user){
//                 if (err) {
//                     res.status(500).json({
//                         message: "An error occurred",
//                         obj: err
//                     })
//                 }
//                 var index = review[0].movie.reviews.indexOf(reviewId);
//                 review[0].movie.reviews.splice(index, 1);
//                 review[0].movie.save(function(err, movie){
//                     if (err) {
//                         res.status(500).json({
//                             message: "An error occurred",
//                             obj: err
//                         })
//                     }
//                     res.status(200).json({
//                         message: "successful",
//                         obj: index
//                     })
//                 })
//             });
//         })
// });

module.exports = router