const httpStatus = require('http-status');
const { pick } = require('lodash');
const { Transaction } = require('../models');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { getQueryOptions } = require('../utils/query.utils');

const getTransactions = catchAsync(async (req, res) => {
  const transactions = await Transaction.find({}).lean();
  if (transactions) {
    res.send(transactions);
  } else {
    res.send([]);
  }
});

const addTransactions = catchAsync(async (req, res) => {
  let{transaction,amount,description}=req.body
  const lastTransaction = await Transaction.find({}).sort({_id:-1}).limit(1);
  console.log('====================================');
  console.log({lastTransaction});
  console.log('====================================');
  if (lastTransaction) {
    let obj = {
      description: description || 'alpha',
      amount: amount || '',
      transaction:transaction || '',

    };
    if(req.body.transaction=='Credit' ) 
    {
        let previousRunningBalance=lastTransaction[0].runningBalance?lastTransaction[0].runningBalance:0
      obj.credit=amount
      obj.runningBalance=Number(previousRunningBalance)+Number(obj.credit)
      console.log('===========previous=========================');
      console.log({previousRunningBalance})
      console.log('====================================');
    }
    else{
      let previousRunningBalance=lastTransaction[0].runningBalance?lastTransaction[0].runningBalance:0
      obj.debit=amount
      obj.runningBalance=Number(previousRunningBalance)-Number(obj.debit)
      console.log('===========previous=========================');
      console.log({previousRunningBalance})
      console.log('====================================');
    }
   
    let savedTransaction = await Transaction.create(obj);
    res.send(savedTransaction);
  } else {
   
    let obj = {
      description: description || 'alpha',
      amount: amount || '',
      transaction:transaction || '',
      runningBalance:amount 
    };
    if(req.body.transaction=='Credit' ) 
    {
      obj.credit=amount
    }
    else{
      obj.debit=amount
    }
    let savedTransaction = await Transaction.create(obj);
    res.send(savedTransaction);
  }
});

module.exports = {
  getTransactions,
  addTransactions,
};
