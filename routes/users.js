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

  var nameP = req.body.name;
  var emailP = req.body.email;
  var password = req.body.password;

  var user = {
    name: nameP,
    email: emailP,
    passHash: passwordHasher.generate(password)
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

  User.findOne({'email' : email}, 'name email passHash', function(err,user){

    var statusCode = 200;

    if(err) return next(err);

    if(user === null){

      var response = {
        status: 'ERROR',
        message: 'email or password does not match'
      };

      res.status(statusCode).send(response);

      return;

    }

    var hash = user.passHash;


    var success = passwordHasher.verify(password,hash);



    var response = {
      status: success ? 'OK' : 'ERROR',
      message: success ? 'login successful' : 'email or password does not match'
    };

    if(success){
      response.userObj = user;
    }

    res.status(statusCode).send(response);

  });

});


module.exports = router;
