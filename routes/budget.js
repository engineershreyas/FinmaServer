var express = require('express');
var router = express.Router();

var passwordHasher = require('password-hash');

var mongoose = require('mongoose');

var Budget = require('../models/Budget.js');


router.post('/createBudget',function(req,res,next){

  //have to pass in a string, date, and a number arrayl
  var mId= req.body.id;
  var mEndDate = req.body.date;
  var eD = new Date(mEndDate);
  var mPlanData = req.body.data;
  var mBudgetName = req.body.bName;
  var mUsedData = [0,0,0,0,0,0];

  var budget = {
    userId : mId,
    budgetName : mBudgetName,
    endDate : eD,
    planData : mPlanData,
    usedData : mUsedData,
  };

  Budget.create(budget, function(err, budget){
      if(err){
        return next(err);
      }

      res.status(201).json(budget);

  });

});

router.get('/findAllBudgets', function(req,res,next){

  Budget.find({},function(err,budgets){

    if(err) return next(err);

    console.log("returning budgets with length" + budgets.length + "\n");

    res.status(201).json(budgets);

  });

});

router.get('/findBudgets', function(req,res,next){



  var id = req.query.id;



  Budget.find({userId : id},function(err,budgets){

    if(err) return next(err);

    

    res.status(201).json(budgets);

  });


  });

module.exports = router;
