const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuctionSchema = new Schema({
  vendor_id: {
    type: String,
    required: true,
  },
  vendor_name: {
    type: String,
    required: true,
  },
  vendor_email_id: {
    type: String,
    required: true,
  },
  vendor_city: {
    type: String,
    required: true,
  },
  vendor_state: {
    type: String,
    required: true,
  },
  vendor_phone: {
    type: Number,
    required: true,
  },
  pro_name: {
    type: String,
    required: true,
  },
  pro_category: {
    type: String,
    required: true,
  },
  pro_qty: {
    type: Number,
    required: true,
  },
  sdescription: {
    type: String,
    required: true,
  },
  ldescription: {
    type: String,
    required: true,
  },
  pro_image: {
    type: String,
    required: true,
  },
  pro_unit: {
    type: String,
    required: true,
  },
  bid_start_amount: {
    type: Number,
    required: true,
  },
  bid_inc_amount: {
    type: Number,
    required: true,
  },
  pro_start_time: {
    type: Number,
    required: true,
  },
  pro_end_time: {
    type: Number,
    required: true,
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
// ProductSchema.index({ pro_name: "text", pro_category: "text" });
const Auction = mongoose.model("Auction", AuctionSchema);

module.exports = Auction;
