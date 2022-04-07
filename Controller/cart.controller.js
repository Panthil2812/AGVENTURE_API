const Cart = require("../Model/cart.model");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cry = require("../crypto");

module.exports = {
  //GET ALL  CART PRODUCTS INFORMATION
  getAllCartProducts: async (req, res) => {
    try {
      console.log("getAllCartProducts : calling .....");
      const result = await Cart.find(
        { cart_id: req.params.id },
        {
          __v: 0,
          updated_date: 0,
          create_date: 0,
        }
      ).sort({ pro_name: 1 });
      res.send({
        status: res.statusCode,
        message: "successfully all Cart products information",
        data: result,
      });
      console.log("getAllCartProducts : successfully ....");
    } catch (error) {
      res.send({
        status: res.statusCode,
        message: error.message,
        data: 1,
      });
      console.log("getAllCartProducts : error message: ", error.message);
    }
  },
  //ADD PRODUCTS TO CART
  addToCart: async (req, res) => {
    try {
      console.log("addToCart  : calling .....");
      // req.body.password = cry.encrypt(req.body.password);
      const p_id = req.body.pro_id;
      const c_id = req.body.cart_id;

      const check = await Cart.findOne(
        {
          cart_id: c_id,
          pro_id: p_id,
        },
        { __v: 0, updated_date: 0, create_date: 0 }
      );
      if (check != null) {
        check.pro_qty = check.pro_qty + 1;
        const option = { new: true };
        const result = await Cart.findOneAndUpdate(
          { _id: check._id, cart_id: c_id, pro_id: p_id },
          check,
          option
        );
        res.send({
          status: res.statusCode,
          message: "successfully update  cart Product",
          data: result,
        });
        console.log("addToCart : successfully ....");
      } else {
        const cart = new Cart(req.body);
        const result = await cart.save();
        res.send({
          status: res.statusCode,
          message: "successfully added  cart Product",
          data: result,
        });
        console.log("addToCart : successfully ....");
      }
    } catch (error) {
      // console.log(error);
      res.send({
        status: res.statusCode,
        message: "Not added product in cart",
      });
      console.log("addToCart : error message: ", error.message);
    }
  },
  //UPDATE PRODUCTS ID
  updateCartProductsById: async (req, res) => {
    try {
      console.log("updateCartProductsById  : calling .....");
      const id = req.body._id;
      let newQuery = JSON.parse(JSON.stringify(req.body));
      const option = { new: true };
      // console.log(newQuery)
      const result = await Products.findOneAndUpdate(
        { _id: id },
        newQuery,
        option
      );
      if (!result) {
        res.send({
          status: res.statusCode,
          message: "products id not found",
        });
        console.log("updateCartProductsById : products id not found ....");
      } else {
        res.send({
          status: res.statusCode,
          message: "successfully added Product",
        });
        console.log("updateProducts : successfully ....");
      }
    } catch (error) {
      // console.log(error);
      res.send({
        status: res.statusCode,
        message: "Not added your product",
      });
      console.log("updateCartProductsById : error message: ", error.message);
    }
  },
  //DELETE CART PRODUCTS BY ID
  deleteCartProductById: async (req, res, next) => {
    try {
      console.log("deleteCartProductById  : calling .....");
      const id = req.params.id;
      const result = await Cart.findOneAndDelete({ _id: id });
      if (!result) {
        res.send({
          status: 500,
          message: "your product not finded",
          data: 0,
        });
        console.log("deleteCartProductById :  your product not finded......");
      } else {
        res.send({
          status: res.statusCode,
          message: "successfully deleted cart products",
          data: 1,
        });
        console.log("deleteCartProductById : successfully ....");
      }
    } catch (error) {
      res.send({
        status: res.statusCode,
        message: "please try again ",
        data: id,
      });
      console.log("deleteProductById : error message: ", error.message);
    }
    // res.send("deleting a single product ")
  },
  //DELETE CART BY CART_ID
  deleteCartById: async (req, res, next) => {
    try {
      console.log("deleteCartById  : calling .....");
      const id = req.params.id;
      const result = await Cart.deleteMany({ cart_id: id });
      if (!result) {
        res.send({
          status: 500,
          message: "your cart not found",
          data: 0,
        });
        console.log("deleteCartById :  your cart not found......");
      } else {
        res.send({
          status: res.statusCode,
          message: "successfully deleted cart products",
          data: 1,
        });
        console.log("deleteCartById : successfully ....");
      }
    } catch (error) {
      res.send({
        status: res.statusCode,
        message: "please try again ",
        data: id,
      });
      console.log("deleteCartById : error message: ", error.message);
    }
    // res.send("deleting a single product ")
  },
};
