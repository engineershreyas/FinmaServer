var PORT = 3000;

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//app.use(cookieParser());

var users = require('./routes/users');

var http = require('http').Server(app);


var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ngb_db',function(err) {
  if(err){
    console.log('Unable to connect to MongoDB',err);
    return;
  }

  console.log('Successfully connected to MongoDB');
});



http.listen(PORT, function() {
  console.log('Listening on port 3000');
});

app.use('/users',users);

module.exports = app;
