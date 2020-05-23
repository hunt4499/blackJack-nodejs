const express = require('express');

const officeTransactionsController = require('../../controllers/transaction.controller');

const router = express.Router();

router.get('/get-transaction',officeTransactionsController.getTransactions);

router.post('/add-transaction',officeTransactionsController.addTransactions);




module.exports = router;