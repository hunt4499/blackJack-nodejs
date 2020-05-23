const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
  {
    name: {type: String, required: true},
    category: [{
        products:[]
      }],
  },
  {
    timestamps: true,
    toObject: { getters: true },
    toJSON: { getters: true },
  }
);

const UserInfo = mongoose.model('UserInfo', UserSchema);

module.exports = UserInfo;
