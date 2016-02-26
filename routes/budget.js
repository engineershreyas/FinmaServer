var express = require('express');
var router = express.Router();

var passwordHasher = require('password-hash');

var mongoose = require('mongoose');

var Budget = require('../models/Budget.js');


router.post('/createBudget',function(req,res,next){


  //have to pass in a string, date, and a number arrayl


});
