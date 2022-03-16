const mongoose = require("mongoose");
const { stringify } = require("querystring");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  user_name: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email_id: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: Number,
    required: true,
  },
  type: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  profile_pic: {
    type: String,
  },
  d_flag: {
    type: Boolean,
    default: false,
  },
  updated_date: {
    type: Date,
  },
  create_date: {
    type: Date,
    default: Date.now,
  },
});
const User = mongoose.model("user", UserSchema);
module.exports = User;
