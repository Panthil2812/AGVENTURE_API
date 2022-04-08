const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  customer_id: {
    type: String,
    required: true,
  },
  order_id: {
    type: String,
    required: true,
  },
  customer_name: {
    type: String,
    required: true,
  },
  vendor_id: {
    type: String,
    required: true,
  },
  vendor_name: {
    type: String,
    required: true,
  },
  pro_name: {
    type: String,
    required: true,
  },
  pro_qty: {
    type: Number,
    required: true,
  },
  pro_image: {
    type: String,
    required: true,
  },
  pro_status: {
    type: String,
    required: true,
  },
  pro_unit: {
    type: String,
    required: true,
  },
  pro_sell_price: {
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
const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
