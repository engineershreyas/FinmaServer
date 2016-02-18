var express = require('express');
var router = express.Router();

var passwordHasher = require('password-hash');

var mongoose = require('mongoose');

var User = require('../models/User.js');
router.get('/',function(req,res,next){

  console.log("swag");

});
router.post('/register',function(req,res,next){

  //handle missed params on client side

  var user = {
    email: req.body.email,
    passwordHash: passwordHasher.generate(req.body.password)
  };

  User.create(user, function(err, user){
    if(err){
      return next(err);
    }

    res.status(201).json(user);

  });

});

router.post('/login', function(req,res,next){

  //handle missing information on client side

  var email = req.body.email;
  var password = req.body.password;

  User.findOne({'username' : username}, 'username passwordHash', function(err,user){

    if(err) return next(err);

    var hash = user.passwordHash;

    var success = passwordHasher.verify(password,hash);

    var statusCode = success ? 200 : 401;

    var response = {
      status: success ? 'OK' : 'ERROR',
      message: success ? 'login successful' : 'wrong password'
    };

    if(success){
      response.userObj = user;
    }

    res.status(statusCode).send(response);

  });

});


module.exports = router;
