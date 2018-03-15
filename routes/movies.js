var express = require('express');
var router = express.Router();
var Movie = require('../models/movie');
var User = require('../models/user');
var async = require('async');
var request = require('request');
var queryString = require('querystring');


router.get('/getmovies/:searchValue', function(req, res, next) {

    const searchValue = req.params.searchValue;

    // returns an array of movies that match the value in the input box on the front side
    Movie.find({$or:[{'title': new RegExp(searchValue, "i")}]}).limit(3).exec(function(err, docs){
       if (err) {
           res.status(500).json({
               message: "An error occurred",
               obj: err
           })
       }
       res.status(200).json({
           Message: "success",
           obj: docs
       })
   })
});

router.get('/getTrailers', function(req, res, next) {
    // get the Three most recent movies
    Movie.find({}).sort({'year': -1}).limit(3).exec(function(err, movies){
        async.parallel([
                function(callback) {
                    var urlQueryString = queryString.stringify({
                        part: 'snippet',
                        q: movies[0].title + ' official',
                        key: 'AIzaSyD4shfocwn-Ed3Feuoo9fG3d2K2GjHmKeI',
                        maxResults: '1',
                        order: 'relevance',
                        type: 'video'
                    });

                    request('https://www.googleapis.com/youtube/v3/search?' + urlQueryString ,
                        function (error, response, body) {
                            body = JSON.parse(body);
                            callback(null, {
                                body: body,
                                movie: movies[0]
                            });
                        });
                },
                function(callback) {
                    var urlQueryString = queryString.stringify({
                        part: 'snippet',
                        q: movies[1].title + ' official trailer',
                        key: 'AIzaSyD4shfocwn-Ed3Feuoo9fG3d2K2GjHmKeI',
                        maxResults: '1',
                        order: 'relevance',
                        type: 'video'
                    });
                    request('https://www.googleapis.com/youtube/v3/search?' + urlQueryString ,
                        function (error, response, body) {
                            body = JSON.parse(body);
                            callback(null, {
                                body: body,
                                movie: movies[1]
                            });
                        });
                },
                function(callback) {
                    var urlQueryString = queryString.stringify({
                        part: 'snippet',
                        q: movies[2].title + ' official trailer',
                        key: 'AIzaSyD4shfocwn-Ed3Feuoo9fG3d2K2GjHmKeI',
                        maxResults: '1',
                        order: 'relevance',
                        type: 'video'
                    });
                    request('https://www.googleapis.com/youtube/v3/search?' + urlQueryString ,
                        function (error, response, body) {
                            body = JSON.parse(body);
                            callback(null, {
                                body: body,
                                movie: movies[2]
                            });
                        });
                }
            ],
            function(err, results) {
            if(err){
                res.status(500).json({
                    message: "An error occurred",
                    error: err
                })
            }
                res.status(200).json({
                    result: results
                })
            });
    })
});

module.exports = router;