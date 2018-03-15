var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var socket = require('socket.io');
var Server = require('ws');

var appRoutes = require('./routes/app');
var listRoutes = require('./routes/lists');
var userRoutes = require('./routes/user');
var movieRoutes = require('./routes/movies');
var cinemaRoutes = require('./routes/cinema');
var reviewRoutes = require('./routes/reviews');
var ratingRoutes = require('./routes/ratings');
var movieChatRoutes = require('./routes/movieChat');


var app = express();

mongoose.connect('mongodb://localhost:27017/moviemeter');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});

app.use('/movieChat', movieChatRoutes);
app.use('/ratings', ratingRoutes);
app.use('/reviews', reviewRoutes);
app.use('/cinema', cinemaRoutes);
app.use('/movies', movieRoutes);
app.use('/user', userRoutes);
app.use('/lists', listRoutes);
app.use('/app', appRoutes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render('index');
});

module.exports = app;
