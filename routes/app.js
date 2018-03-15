var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Movie = require('../models/movie');

/* GET home page. */

router.get('/getCounts', function(req, res, next) {
  var votes;
  var reviews;
  Movie.find({}, function(err, movies){
      if (err) {
          return res.status(500).json({
              title: 'An error occurred',
              error: err
          });
      }
      var amountOfMovies = movies.length;
    User.find({}, function(err, users){
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        var amountOfUsers = users.length;
        var amountOfRatings = 0;
        var amountOfReviews = 0;
        users.forEach(function(user){
            amountOfRatings += user.ratings.length;
            amountOfReviews += user.reviews.length;
        });

        res.status(200).json({
              userCount: amountOfUsers,
                movieCount: amountOfMovies,
                ratingCount: amountOfRatings,
                reviewCount: amountOfReviews
        });
    })
  })
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
