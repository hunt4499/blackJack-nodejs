const express = require('express');

const blackJackController = require('../../controllers/blackjack.controller');

const router = express.Router();

router.post('/initiate',blackJackController.initiatePlay);

router.post('/generateHandForPlayer',blackJackController.getCardByPlayerId);

router.post('/playerHistory',blackJackController.getPlayerHistory);

router.post('/drawDealer',blackJackController.drawDealerCard);

router.post('/saveRound',blackJackController.saveRound);


module.exports = router;