"use strict";

require("babel-polyfill");
require("babel-register");

// require('./gcm');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
require("./schemas/baseSchema");
var fs = require('fs');

// expose all models to global env
fs.readdirSync(path.join(__dirname, '/models')).forEach(function (model) {
  global[model.substring(0, model.length - 3) + 'Model'] = require(path.join(__dirname, '/models/', model));
});

var index = require('./routes/index');
var users = require('./routes/users');
var sessions = require('./routes/sessions');
var messages = require('./routes/messages');
var notifications = require('./routes/notifications');
var posts = require('./routes/posts');
var classes = require('./routes/classes');

var app = express();

//globle before actions -- find session verification
require('./beforeActions/findSession');

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', index);
app.use('/users', users);
app.use('/sessions', sessions);
app.use('/messages', messages);
app.use('/notifications', notifications);
app.use('/posts', posts);
app.use('/classes', classes);

// var pathView = path.join(__dirname, '../views');
// console.log(pathView);
// app.get('/chat',function (req,res){
//   res.sendFile(pathView+'/chat.html');
// })

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err.status || 500
    });
    console.trace(err);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: err.status || 500
  });
});

mongoose.connect('mongodb://localhost/lumi');
var db = mongoose.connection;
db.on('error', function (err) {
  console.log(err);
});

db.on('disconnected', function () {
  console.log('Datebase disconnected!!');
});

// module.exports = app;
module.exports = {
  app: app,
  io: require('./socketio')
};