var PORT = 3000;

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var users = require('./routes/users');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ngb_db',function(err) {
  if(err){
    console.log('Unable to connect to MongoDB',err);
    return;
  }

  console.log('Successfully connected to MongoDB');
});

var app = express();

var http = require('http').Server(app);
http.listen(PORT, function() {
  console.log('Listening on port 3000');
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/users',users);

module.exports = app;
