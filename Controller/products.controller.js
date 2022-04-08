const Products = require("../Model/products.model");
const User = require("../Model/user.model");
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
          d_flag: 0,
          create_date: 0,
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
  //GET PRODUCTS INFORMATION BY PRO_ID
  getProductsForPage: async (req, res) => {
    try {
      console.log("getProductsForPage  : calling .....");

      const id = req.params.id;
      const result1 = await Products.find(
        {
          _id: id,
          d_flag: false,
        },
        { __v: 0, updated_date: 0, d_flag: 0, create_date: 0 }
      );
      const result2 = await Products.find(
        {
          vendor_id: result1[0].vendor_id,
          _id: { $ne: id },
          d_flag: false,
        },
        { __v: 0, updated_date: 0, d_flag: 0, create_date: 0 }
      );
      const result3 = await Products.find(
        {
          pro_category: result1[0].pro_category,
          vendor_city: result1[0].vendor_city,
          vendor_id: { $ne: result1[0].vendor_id },
          d_flag: false,
        },
        { __v: 0, updated_date: 0, d_flag: 0, create_date: 0 }
      );
      res.send({
        status: res.statusCode,
        message: "successfully list get products",
        product: result1[0],
        data: result2,
        related: result3,
      });
      console.log("getProductsForPage : successfully ....");
    } catch (error) {
      res.send({
        status: res.statusCode,
        message: "please try again",
        data: 1,
      });
      console.log("getProductsForPage : error message: ", error.message);
    }
  },
  //GET VENDOR INFORMATION BY PRO_ID
  getVendorForPage: async (req, res) => {
    try {
      console.log("getVendorForPage  : calling .....");

      const id = req.params.id;
      const result1 = await User.find(
        {
          _id: id,
          d_flag: false,
        },
        { __v: 0, updated_date: 0, d_flag: 0, create_date: 0 }
      );
      const result2 = await Products.find(
        {
          vendor_id: id,
          d_flag: false,
        },
        { d_flag: 0, create_date: 0, __v: 0 }
      );
      res.send({
        status: res.statusCode,
        message: "successfully list get products",
        vendor: result1[0],
        data: result2,
      });
      console.log("getVendorForPage : successfully ....");
    } catch (error) {
      res.send({
        status: res.statusCode,
        message: "please try again",
        data: 1,
      });
      console.log("getVendorForPage : error message: ", error.message);
    }
  },
  //CREATE PRODUCT
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
  //UPDATE PRODUCTS
  updateProducts: async (req, res) => {
    try {
      console.log("updateProducts  : calling .....");
      const id = req.body.pro_id;
      let newQuery = JSON.parse(JSON.stringify(req.body));
      const option = { new: true };
      newQuery.updated_date = new Date();
      // console.log(newQuery)
      const result = await Products.findOneAndUpdate(
        { _id: id, d_flag: false },
        newQuery,
        option
      );
      if (!result) {
        res.send({
          status: res.statusCode,
          message: "products id not found",
        });
        console.log("updateProducts : products id not found ....");
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
      console.log("updateProducts : error message: ", error.message);
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
        { __v: 0, updated_date: 0, d_flag: 0, create_date: 0 }
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
