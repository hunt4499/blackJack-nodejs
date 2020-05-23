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
  const lastTransaction = await Transaction.findOne({}).sort({ createdOn: -1 });
  if (lastTransaction) {
    let obj = { 
        description: req.body.description||"alpha" ,
        amount:req.body.amount||'',
        transaction:req.body.transaction|| ''
    };
    let savedTransaction = await Transaction.create(obj);
    res.send(savedTransaction);
  } else {
    let obj = { 
        description: req.body.description||"alpha" ,
        amount:req.body.amount||'',
        transaction:req.body.transaction|| ''
    };
    let savedTransaction = await Transaction.create(obj);
    res.send(savedTransaction);
  }
});

module.exports = {
  getTransactions,
  addTransactions,
};
