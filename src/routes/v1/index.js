const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const blackjackRoute = require('./blackjack.route');
const transactionRoute = require('./transaction.route');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/transactions', transactionRoute);
router.use('/docs', docsRoute);
router.use('/blackjack', blackjackRoute);

module.exports = router;
