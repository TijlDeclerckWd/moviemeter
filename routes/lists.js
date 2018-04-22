var express = require('express');
var router = express.Router();
var Movie = require('../models/movie');
var User = require('../models/user');
var Review = require('../models/review');



router.post('/addmovie', function(req, res, next) {
    var body = req.body;

    var movie = new Movie({
        title: req.body.title,
        director: req.body.director,
        length: req.body.length,
        genre: req.body.genre,
        description: req.body.description,
        actors: req.body.actors,
        year: req.body.year,
        ratings: [],
        reviews: [],
        pictureUrl: req.body.pictureUrl,
        trailer: req.body.trailer
    });

    movie.save(function(err, movie) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(200).json({
            message: "success",
            obj: movie
        })
    })
});


router.get('/getmovie/:id', function(req, res, next) {
    var id = req.params.id;

    Movie.findById(id)
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
        .exec(function(err, movie){
                   if (err) {
                       res.status(500).json({
                           message: "An error occurred",
                           obj: err
                       })
                   }
                   res.status(200).json({
                       Message: "success",
                       obj: movie
                   });
               });
            })

router.get('/getList/:listType', function(req, res, next) {
    var listType = req.params.listType;
    console.log(listType);
    if (listType === 'best'){
        Movie.find()
            .$where('this.ratings.length > 0')
            .sort({
                averageRating: -1
            })
            .limit(100)
            .exec(function (err, movies) {
                if (err) {
                    res.status(500).json({
                        message: "An error occurred",
                        obj: err
                    })
                }
                res.status(200).json({
                    Message: "success",
                    obj: movies
                })
            })
    }
    else if (listType === 'worst') {
        Movie.find()
            .$where('this.ratings.length > 0')
            .sort({
                averageRating: 1
            })
            .limit(100)
            .exec(function (err, movies) {
                if (err) {
                    res.status(500).json({
                        message: "An error occurred",
                        obj: err
                    })
                }
                res.status(200).json({
                    Message: "success",
                    obj: movies
                })
            })
    }
    else if ( listType === 'bestNew') {
        var date = new Date();
        console.log(date);
        date.setFullYear(date.getFullYear()-2);
        console.log(date);
        Movie.find()
            .$where('this.ratings.length > 0')
            .where('year').gte(date.getFullYear())
            .where('year')
            .sort({
                averageRating: -1
            })
            .limit(100)
            .exec(function (err, movies) {
                if (err) {
                    res.status(500).json({
                        message: "An error occurred",
                        obj: err
                    })
                }
                res.status(200).json({
                    Message: "success",
                    obj: movies
                })
            })
    }
});

/* GET home page. */

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = router;
