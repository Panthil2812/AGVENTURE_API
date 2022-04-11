const Auction = require("../Model/auction.model");
const User = require("../Model/user.model");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cry = require("../crypto");

module.exports = {
  //CREATE auction  PRODUCT
  createAuctionProducts: async (req, res) => {
    try {
      console.log("createAuctionProducts  : calling .....");
      const product = new Auction(req.body);
      const result = await product.save();
      res.send({
        status: res.statusCode,
        message: "successfully added Auction Product",
        data: 1,
      });
      console.log("createAuctionProducts : successfully ....");
    } catch (error) {
      // console.log(error);
      res.send({
        status: res.statusCode,
        message: "Not added your product",
      });
      console.log("createAuctionProducts : error message: ", error.message);
    }
  },
  // get all auction products
  getAllAuctionProducts: async (req, res) => {
    try {
      console.log("getAllAuctionProducts  : calling .....");
      const result = await Auction.find(
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
        message: "successfully added Auction Product",
        data: result,
      });
      console.log("getAllAuctionProducts : successfully ....");
    } catch (error) {
      // console.log(error);
      res.send({
        status: res.statusCode,
        message: "Not added your product",
      });
      console.log("getAllAuctionProducts : error message: ", error.message);
    }
  },
  //GET Auction INFORMATION BY auction_ID
  getAuctionForPage: async (req, res) => {
    try {
      console.log("getAuctionForPage  : calling .....");

      const id = req.params.id;
      const result1 = await Auction.find(
        {
          _id: id,
          d_flag: false,
        },
        { __v: 0, updated_date: 0, d_flag: 0, create_date: 0 }
      );
      const result2 = await Auction.find(
        {
          vendor_id: result1[0].vendor_id,
          _id: { $ne: id },
          d_flag: false,
        },
        { __v: 0, updated_date: 0, d_flag: 0, create_date: 0 }
      );
      const result3 = await Auction.find(
        {
          pro_category: result1[0].pro_category,
          vendor_city: result1[0].vendor_city,

          d_flag: false,
        },
        { __v: 0, updated_date: 0, d_flag: 0, create_date: 0 }
      );
      //   console.log(result1);
      //   console.log(result2);
      //   console.log(result3);
      res.send({
        status: res.statusCode,
        message: "successfully list get products",
        product: result1[0],
        data: result2,
        related: result3,
      });
      console.log("getAuctionForPage : successfully ....");
    } catch (error) {
      res.send({
        status: res.statusCode,
        message: "please try again",
        data: 1,
      });
      console.log("getAuctionForPage : error message: ", error.message);
    }
  },
};
