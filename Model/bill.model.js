const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BillSchema = new Schema({
  customer_id: {
    type: String,
    required: true,
  },
  customer_name: {
    type: String,
    required: true,
  },
  customer_street_address: {
    type: String,
    required: true,
  },
  customer_email: {
    type: String,
    required: true,
  },
  customer_phone: {
    type: Number,
    required: true,
  },
  bill_notes: {
    type: String,
    required: true,
  },
  total_products: {
    type: Number,
    required: true,
  },
  subtotal: {
    type: Number,
    required: true,
  },
  total_amount: {
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
const Bill = mongoose.model("Bill Detaill", BillSchema);

module.exports = Bill;
