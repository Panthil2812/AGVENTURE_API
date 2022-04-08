const Order = require("../Model/order.model");
const Bill = require("../Model/bill.model");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cry = require("../crypto");

module.exports = {
  //CREATE ORDER
  createOrder: async (req, res) => {
    try {
      console.log("createOrder  : calling .....");
      const billData = req.body.bill;
      const bill = new Bill(billData);
      const result = await bill.save();
      // console.log(req.body.order, typeof req.body.order);
      // console.log("re :", result);
      const pro = req.body.products;
      for (const i in pro) {
        const pro_info = {
          customer_id: billData.customer_id,
          order_id: result._id,
          customer_name: billData.customer_name,
          vendor_id: pro[i].vendor_id,
          vendor_name: pro[i].vendor_name,
          pro_name: pro[i].pro_name,
          pro_qty: pro[i].pro_qty,
          pro_image: pro[i].pro_image,
          pro_status: pro[i].pro_status,
          pro_unit: pro[i].pro_unit,
          pro_sell_price: pro[i].pro_sell_price,
          pro_status: "Pending",
        };
        const order = new Order(pro_info);

        const result1 = await order.save();
        // console.log(result1);
      }
      res.send({
        status: res.statusCode,
        message: "successfully added Product",
        data: result._id,
      });
      console.log("createOrder : successfully ....");
    } catch (error) {
      // console.log(error);
      res.send({
        status: res.statusCode,
        message: "Not added your product",
      });
      console.log("createOrder : error message: ", error.message);
    }
  },
  //GET ALL PRODUCTS INFORMATION OF VENDOR ORDER PAGE
  getAllOrderForVendor: async (req, res) => {
    try {
      console.log("getAllOrderForVendor : calling .....");
      const id = req.params.id;
      const result = await Order.find(
        { vendor_id: id, d_flag: false },
        {
          __v: 0,
          updated_date: 0,
          d_flag: 0,
          create_date: 0,
        }
      );
      // .sort({ pro_name: 1 });
      res.send({
        status: res.statusCode,
        message: "successfully all products information",
        data: result,
      });
      console.log("getAllOrderForVendor : successfully ....");
    } catch (error) {
      res.send({
        status: res.statusCode,
        message: error.message,
        data: 1,
      });
      console.log("getAllOrderForVendor : error message: ", error.message);
    }
  },
  //GET ALL PRODUCTS INFORMATION OF VENDOR ORDER PAGE
  vendorOrderEditProducts: async (req, res) => {
    try {
      console.log("vendorOrderEditProducts  : calling .....");
      const id = req.body._id;
      let newQuery = JSON.parse(JSON.stringify(req.body));
      const option = { new: true };
      newQuery.updated_date = new Date();
      // console.log(newQuery)
      const result = await Order.findOneAndUpdate(
        { _id: id, d_flag: false },
        newQuery,
        option
      );
      if (!result) {
        res.send({
          status: res.statusCode,
          message: "products id not found",
        });
        console.log("vendorOrderEditProducts : products id not found ....");
      } else {
        res.send({
          status: res.statusCode,
          message: "successfully added Product",
        });
        console.log("vendorOrderEditProducts : successfully ....");
      }
    } catch (error) {
      // console.log(error);
      res.send({
        status: res.statusCode,
        message: "Not added your product",
      });
      console.log("vendorOrderEditProducts : error message: ", error.message);
    }
  },
  //GET ALL PRODUCTS INFORMATION OF CUSTOMER ORDER PAGE
  getAllOrderForCustomer: async (req, res) => {
    try {
      console.log("getAllOrderForCustomer : calling .....");
      const id = req.params.id;
      const result = await Bill.find(
        { customer_id: id, d_flag: false },
        {
          __v: 0,
          updated_date: 0,
          d_flag: 0,
        }
      ).sort({ pro_name: 1 });
      res.send({
        status: res.statusCode,
        message: "successfully all products information",
        data: result,
      });
      console.log("getAllOrderForCustomer : successfully ....");
    } catch (error) {
      res.send({
        status: res.statusCode,
        message: error.message,
        data: 1,
      });
      console.log("getAllOrderForCustomer : error message: ", error.message);
    }
  },
  //GET ALL PRODUCTS INFORMATION OF CUSTOMER ORDER PAGE
  getAllOrderForCustomerProducts: async (req, res) => {
    try {
      console.log("getAllOrderForCustomerProducts : calling .....");
      const id = req.params.id;
      const result = await Order.find(
        { order_id: id, d_flag: false },
        {
          __v: 0,
          updated_date: 0,
          d_flag: 0,
        }
      ).sort({ pro_name: 1 });
      res.send({
        status: res.statusCode,
        message: "successfully all products information",
        data: result,
      });
      console.log("getAllOrderForCustomerProducts : successfully ....");
    } catch (error) {
      res.send({
        status: res.statusCode,
        message: error.message,
        data: 1,
      });
      console.log(
        "getAllOrderForCustomerProducts : error message: ",
        error.message
      );
    }
  },
};
