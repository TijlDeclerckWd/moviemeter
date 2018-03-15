var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

router.get('/getUser/:id', function(req,res,next){
    User.find({'_id': req.params.id}, function(err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(200).json({
            message: 'User retreived',
            obj: user
        });
    })
});

router.post('/', function(req, res, next) {
    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email,
        ratings: [],
        reviews: []
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
        res.status(200).json({
            message: 'Successfully logged in',
            token: token,
            userId: user._id,
            fullName: user.firstName + ' ' + user.lastName
        });
    })
});

module.exports = router;
