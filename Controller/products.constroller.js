const Products = require("../Model/products.model");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cry = require("../crypto");

module.exports = {
  //GET ALL PRODUCTS INFORMATION
  getAllProducts: async (req, res) => {
    try {
      // await mongoose.products.createIndex({
      //   pro_name: "text",
      //   pro_category: "text",
      // });
      console.log("getAllProducts : calling .....");
      const result = await Products.find(
        { d_flag: false },
        {
          __v: 0,
          updated_date: 0,
          create_date: 0,
          d_flag: 0,
        }
      ).sort({ pro_name: 1 });
      res.send({
        status: res.statusCode,
        message: "successfully all products information",
        data: result,
      });
      console.log("getAllProducts : successfully ....");
    } catch (error) {
      res.send({
        status: res.statusCode,
        message: error.message,
        data: 1,
      });
      console.log("getAllProducts : error message: ", error.message);
    }
  },
  //CREATE USER ACCOUNT
  createProducts: async (req, res) => {
    try {
      console.log("createProducts  : calling .....");
      // req.body.password = cry.encrypt(req.body.password);
      const products = new Products(req.body);

      const result = await products.save();
      res.send({
        status: res.statusCode,
        message: "successfully added Product",
      });
      console.log("createProducts : successfully ....");
    } catch (error) {
      // console.log(error);
      res.send({
        status: res.statusCode,
        message: "Not added your product",
      });
      console.log("createProducts : error message: ", error.message);
    }
  },
  //GET PRODUCTS USING VENDOR ID
  vendorProducts: async (req, res) => {
    try {
      console.log("vendorProducts  : calling .....");

      const id = req.params.id;
      const result = await Products.find(
        {
          vendor_id: id,
          d_flag: false,
        },
        { d_flag: 0, create_date: 0, __v: 0 }
      );
      if (result != null) {
        res.send({
          status: res.statusCode,
          message: "successfully list get products",
          data: result,
        });
        console.log("vendorProducts : successfully ....");
      } else {
        res.send({
          status: 500,
          message: "vendor not find",
          data: 1,
        });
        console.log("vendorProducts : vendor not find ......");
      }
    } catch (error) {
      res.send({
        status: res.statusCode,
        message: "please try again",
        data: 1,
      });
      console.log("vendorProducts : error message: ", error.message);
    }
  },
  //DELETE USER USING USER ID
  deleteProductById: async (req, res, next) => {
    try {
      console.log("deleteProductById  : calling .....");
      const id = req.params.id;
      const result = await Products.findOneAndDelete({ _id: id });
      if (!result) {
        res.send({
          status: 500,
          message: "your product not finded",
          data: 0,
        });
        console.log("deleteProductById :  your product not finded......");
      } else {
        res.send({
          status: res.statusCode,
          message: "successfully deleted products",
          data: 1,
        });
        console.log("deleteProductById : successfully ....");
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
};
