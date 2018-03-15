var express = require('express');
var router = express.Router();
var Movie = require('../models/movie');
var User = require('../models/user');


router.get('/getLatestMovie', function(req,res,next){
    Movie.find({'year': {$gte: 2015}})
        .sort('-year')
        .populate({
            path: 'reviews',
            populate: {
                path: 'user',
                select: ['firstName', 'lastName', 'ratings'],
                populate: {
                    path: 'ratings'
                }
            }
        })
       .exec(function(err, movies){
          var movie = movies[0];
          if (err) {
               res.status(500).json({
                   message: "An error occurred",
                   obj: err
               })
           }
           res.status(200).json({
               Message: "success",
               obj: movie
           })
       })
});

module.exports = router;