const mongoose = require('mongoose');

const gameSchema = mongoose.Schema(
  {
    player1: {
      playerId: { type: Number, index: true },
      currentRound: { type: Number, default: 1 },
      playerInfo: {},
      handCards: [],
      isWinner: {
        type: Boolean,
        default: false,
      },
    },
    player2: {
      playerId: { type: Number, index: true },
      currentRound: { type: Number, default: 1 },
      playerInfo: {},
      handCards: [],
      isWinner: {
        type: Boolean,
        default: false,
      },
    },
    player3: {
      playerId: { type: Number, index: true },
      currentRound: { type: Number, default: 1 },
      playerInfo: {},
      handCards: [],
      isWinner: {
        type: Boolean,
        default: false,
      },
    },
    dealer: {
        currentRound: { type: Number, default: 1 },
        handCards: [],
        isWinner: {
          type: Boolean,
          default: false,
        },
      },
    roundsCompleted:{ type: Number, default: 1 },  
    Deck: [],
    gameInfo: {
      winners: [],
      timePlayed: [],
    },
  },
  {
    timestamps: true,
    toObject: { getters: true },
    toJSON: { getters: true },
  }
);

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
