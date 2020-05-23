const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema(
  {
    name: {type: String, required: true},
    productInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'productDetails',
        default: null,
        select: false,
      },
  },
  {
    timestamps: true,
    toObject: { getters: true },
    toJSON: { getters: true },
  }
);

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
