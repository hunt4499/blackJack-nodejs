const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema(
  {
    name: {type: String, required: true},
    type:{type: String, required: true},
    productsIncluded: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        default: null,
        select: false,
      }],
  },
  {
    timestamps: true,
    toObject: { getters: true },
    toJSON: { getters: true },
  }
);

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
