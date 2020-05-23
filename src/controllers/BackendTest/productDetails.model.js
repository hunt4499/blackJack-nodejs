const mongoose = require('mongoose');

const productDetailSchema = mongoose.Schema(
  {
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
  },
  {
    timestamps: true,
    toObject: { getters: true },
    toJSON: { getters: true },
  }
);

const productDetails = mongoose.model('productDetails', productDetailSchema);

module.exports = productDetails;
