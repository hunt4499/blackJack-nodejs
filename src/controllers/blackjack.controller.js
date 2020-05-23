const httpStatus = require('http-status');
const { pick } = require('lodash');
const { Game } = require('../models');
const ApiError = require('../utils/ApiError');
const Decks = require('../utils/Decks');
const Players = require('../utils/Players');
const catchAsync = require('../utils/catchAsync');
// const userInfo = require('./userInfo.model');
const { getQueryOptions } = require('../utils/query.utils');
const axios = require('axios');
const fs = require('fs');
const util = require("util");
const appendFile = util.promisify(fs.appendFile);

const initiatePlay = catchAsync(async (req, res) => {
  let newDeck = new Decks();
  let shuffledDeck = newDeck.shuffle();
  let newDeck2 = new Decks();
  let shuffledDeck2 = newDeck2.shuffle();
  let newDeck3 = new Decks();
  let shuffledDeck3 = newDeck3.shuffle();
  let p1 = new Players(1);
  let p2 = new Players(2);
  let p3 = new Players(3);
  let combinedDeck = [...shuffledDeck, ...shuffledDeck2, ...shuffledDeck3];
  console.log('ShuffledDeck length previously', combinedDeck.length);
  let initialCardPlayer1 = combinedDeck.pop();
  let initialCardPlayer2 = combinedDeck.pop();
  let initialCardPlayer3 = combinedDeck.pop();
  console.log('ShuffledDeck length now', combinedDeck.length);
  p1.handCards = initialCardPlayer1;
  p2.handCards = initialCardPlayer2;
  p3.handCards = initialCardPlayer3;
  let obj = {
    currentRound: 1,
    player1: {
      playerId: 1,
      handCards: [initialCardPlayer1],
    },
    player2: {
      playerId: 2,
      handCards: [initialCardPlayer2],
    },
    player3: {
      playerId: 3,
      handCards: [initialCardPlayer3],
    },
    Deck: combinedDeck,
  };

  const game = await Game.create(obj);
  res.send(game);
});

const getCardByPlayerId = catchAsync(async (req, res) => {
  let { gameId, playerId } = req.body;
  console.log('====================================');
  console.log({ gameId, playerId });
  console.log('====================================');
  let key = `player${playerId}`;
  const player = await Game.findOne({ _id: gameId });

  let totalPlayerHand = await TotalHandWeight(player[key].handCards);
  console.log('====================================');
  console.log({ totalPlayerHand });
  console.log('====================================');
  if (totalPlayerHand < 21) {
    let newHand = player.Deck.pop();
    ++player[key].currentRound;
    player[key].handCards.push(newHand);
    let savedPlayerDetails = await player.save();
    res.send(savedPlayerDetails[key]);
  } else {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Player hand greater than 21');
  }
});

const getPlayerHistory = catchAsync(async (req, res) => {
  let { gameId, playerId } = req.body;
  console.log('====================================');
  console.log({ gameId, playerId });
  console.log('====================================');
  let key = `player${playerId}`;
  const playerDetails = await Game.findOne({ _id: gameId }).select(`${key}`);
  res.send(playerDetails);
});

const drawDealerCard = catchAsync(async (req, res) => {
  let { gameId } = req.body;
  console.log('====================================');
  console.log({ gameId });
  console.log('====================================');
  const player = await Game.findOne({ _id: gameId });
  let totalDealerHand = await TotalHandWeight(player['dealer'].handCards);
  console.log('====================================');
  console.log({ totalDealerHand });
  console.log('====================================');
  if (totalDealerHand < 21) {
    let newHand = player.Deck.pop();
    ++player['dealer'].currentRound;
    player['dealer'].handCards.push(newHand);
    let savedPlayerDetails = await player.save();
    console.log('====================================');
    console.log(savedPlayerDetails.dealer);
    console.log('====================================');
    res.send(savedPlayerDetails.dealer);
  } else {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Dealer hand greater than 21');
  }
});

const saveRound = catchAsync(async (req, res) => {
  // let { gameId } = req.body;
  // console.log('====================================');
  // console.log({ gameId });
  // console.log('====================================');
  // const gameDetails = await Game.findOneAndUpdate(
  //   { _id: gameId },
  //   { $inc: { roundsCompleted: 1 } },
  //   {
  //     new: true,
  //   }
  // );
  // res.send(gameDetails);
  let user={
    name: "Ajay",
    category: [{
        products:["phones","OtherGadgets"]
      }],
  }
  const savedUser = await userInfo.create(user);
  let foundDetails=await userInfo.find({category: { $elemMatch: { products: {$in:["phones"]} } },})

  res.send(foundDetails);
});

const TotalHandWeight = function (hand) {
  return new Promise(async (resolve, reject) => {
    var total = 0;
    var hasAce = 0;
    for (var i = 0; i < hand.length; i++) {
      total += hand[i].Weight;
      if (hand[i].Weight == 11) {
        hasAce += 1;
      }
    }
    for (var j = 0; j < hasAce; j++) {
      if (total + 10 <= 21) {
        total += 10;
      }
    }
    resolve(total);
  });
};

const firstPromise = function () {
  return new Promise(async (resolve, reject) => {
    console.log('Inside 1st Promise');
    resolve(true);
  });
};

const fourthPromise = function () {
  return new Promise(async (resolve, reject) => {
    console.log('Inside 4th Promise');
    resolve(true);
  });
};

const fifthPromise = function () {
  return new Promise(async (resolve, reject) => {
    console.log('Inside 5th Promise');
    setTimeout(() => {
      if (Math.random(1) > 0.5) {
        resolve(true);
      } else {
        resolve(false);
      }
    }, 500);
  });
};

module.exports = {
  initiatePlay,
  getCardByPlayerId,
  getPlayerHistory,
  drawDealerCard,
  saveRound,
};
