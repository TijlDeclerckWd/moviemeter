var express = require('express');
var router = express.Router();
var User = require('../models/user');
var async = require('async');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var multer = require('multer');
var path = require('path');
var storage = multer.diskStorage(
    { destination: function (req, file, cb) { cb(null, './public/uploads') },
        filename: function (req, file, cb) { cb(null, Date.now() + path.extname(file.originalname)) }
    }
    );
var upload = multer({ storage: storage });


router.post('/addTop10/:userId', function(req, res){
   User.find({'_id': req.params.userId}, function (err, user) {
       user[0].top10.filledIn = true;
       user[0].top10.top10List = req.body;
       user[0].save(function(err, user){
           if (err) {
               return res.status(500).json({
                   title: 'An error occurred',
                   error: err
               });
           }
           res.status(200).json({
               message: 'User retrieved',
               obj: user
           });
       });
   });
});

router.get('/getUser/:id', function(req,res,next){
    User.find({'_id': req.params.id}, function(err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(200).json({
            message: 'User retrieved',
            obj: user[0]
        });
    })
});


router.get('/getUserStatistics/:id', function(req,res,next){
    User.find({'_id': req.params.id})
        .populate('ratings')
        .populate('reviews')
        .exec(function (err, user) {

            user = user[0]
            var amountOfRatings = user.ratings.length;
            var amountOfReviews = user.reviews.length;

            var averageRating;
            var standardDeviation;

            if ( amountOfRatings > 0) {
                averageRating = user.ratings.reduce(function (sum, item) {
                    return sum + item.rating
                },0) / user.ratings.length;

                // calculate standard Deviation
                var arr = user.ratings.map(function(rating, index){
                    var subt = rating.rating - averageRating;
                    return Math.pow(subt, 2);
                });
                standardDeviation = arr.reduce(function(sum, num){
                    return sum + num
                }) / amountOfRatings;
            }
            else {
                averageRating = 0;
                standardDeviation = 0;
            }

            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Information retrieved',
                statistics: {
                    amountOfReviews: amountOfReviews,
                    amountOfRatings: amountOfRatings,
                    standardDeviation: standardDeviation,
                    averageRating: averageRating,
                    lastLogin: user.lastLogin,
                    registerDate: user.registerDate
                },
                user: user
            });
        })
});

router.post('/signup', function(req, res, next) {

    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email,
        ratings: [],
        reviews: [],
        registerDate: new Date()
    });

    user.save(function(err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(200).json({
            message: 'User created',
            obj: result
        });
    })
});

router.post('/signin', function(req, res, next) {
    User.findOne({email: req.body.email}, function(err,user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        // in both cases (where we can't find the user or the password is incorrect, we
        // make sure that we don't give informatio about which one is wrong. Otherwise
        // people with bad intentions can keeptrying until they find the combination
        if (!user) {
            return res.status(401).json({
                title: 'Login failed: invalid login credentials',
                error: {message: 'Invalid login credentials'}
            });
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                title: 'Login failed: invalid login credentials ',
                error: {message: 'Invalid login credentials'}
            })
        }
        var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
        user.lastLogin = new Date();
        user.save(function (err, user) {
            res.status(200).json({
                message: 'Successfully logged in',
                token: token,
                fullName: user.firstName + ' ' + user.lastName
            });
        });
    });
});

router.post('/uploadProfilePicture/:userId', upload.single('fileKey'), function(req, res){
    console.log(req.file);
    User.find({'_id': req.params.userId}, function(err, user){
        user.profilePicture.name = req.file.filename;
        user.profilePicture.uploaded = true;
        user.save(function(err, user){
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'User created',
                imageUrl: user.profilePicturne.name
            });
        })
    });


    res.status(200).json({
        msg: 'guuud'
    })
});

module.exports = router;
