const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      index: true,
    },
    credit: {
      type: Number,
    },
    debit: {
      type: Number,
    },
    createdOn: {
      type: Date,
    },
    runningBalance: {
      type: Number,
    },
  },
  {
    timestamps: true,
    toObject: { getters: true },
    toJSON: { getters: true },
  }
);

const Trancation = mongoose.model('Trancation', transactionSchema);

module.exports = Trancation;
