const mongoose = require("mongoose");
const { stringify } = require("nodemon/lib/utils");
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  cart_id: {
    type: String,
    required: true,
  },
  vendor_id: {
    type: String,
    required: true,
  },
  pro_id: {
    type: String,
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
    default: 1,
  },
  pro_image: {
    type: String,
    required: true,
  },
  pro_unit: {
    type: String,
    required: true,
  },
  pro_mrp: {
    type: Number,
    required: true,
  },
  total_price: {
    type: Number,
    default: 0,
  },
  create_date: {
    type: Date,
    default: Date.now,
  },
  expire_at: { type: Date, default: Date.now, expires: 60 * 60 * 24 },
});
// ProductSchema.index({ pro_name: "text", pro_category: "text" });
const Products = mongoose.model("Cart", CartSchema);

module.exports = Products;
