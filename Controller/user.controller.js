const User = require("../Model/user.model");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cry = require("../crypto");
module.exports = {
  //GET ALL USER INFORMATION
  getAllUser: async (req, res) => {
    try {
      const result = await User.find();
      res.send({
        status: res.statusCode,
        message: "successfully all user information",
        info: result,
      });
    } catch (error) {
      res.send({
        status: res.statusCode,
        message: error.message,
      });
    }
  },
  //CREATE USER ACCOUNT
  createUser: async (req, res) => {
    const email_id = req.body.email_id;
    // console.log("email id : " + email_id);
    const c = await User.countDocuments({ email_id: email_id });
    if (c == 0) {
      try {
        // req.body.password = cry.encrypt(req.body.password);
        const user = new User(req.body);

        const result = await user.save();
        res.send({
          status: res.statusCode,
          message: "successfully account created",
        });
      } catch (error) {
        // console.log(error);
        res.send({
          status: res.statusCode,
          message: "Not created your account",
        });
      }
    } else {
      // res.statusCode = 405;
      //next(createError(500, "email already exists"));
      res.send({
        status: 500,
        message: "email is already added",
      });
    }
  },
  findUser: async (req, res) => {
    try {
      const result = await User.findOne(
        {
          email_id: req.body.email_id,
          d_flag: false,
        },
        { d_flag: 0 }
      );
      if (
        result != null &&
        cry.decrypt(req.body.password) === cry.decrypt(result.password)
      ) {
        const token = jwt.sign(
          JSON.parse(JSON.stringify(result)),
          "agventure",
          { expiresIn: 60 * 60 * 24 }
        );
        res.send({
          status: res.statusCode,
          message: "successfully login",
          data: token,
        });
      } else {
        res.send({
          status: 500,
          message: "email not find",
          data: 1,
        });
      }
    } catch (error) {}
  },
};
