const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
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
  pro_mrp: {
    type: Number,
    required: true,
  },
  pro_sell_price: {
    type: Number,
    required: true,
  },
  pro_stock: {
    type: String,
    required: true,
  },
  pro_hsn: {
    type: String,
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
const Products = mongoose.model("Products", ProductSchema);

module.exports = Products;
