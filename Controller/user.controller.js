const User = require("../Model/user.model");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cry = require("../crypto");
const Products = require("../Model/products.model");

module.exports = {
  //GET ALL USER INFORMATION
  getAllUser: async (req, res) => {
    try {
      const result = await User.find(
        { d_flag: false, type: { $ne: 2 } },
        {
          __v: 0,
          date: 0,
          updated_date: 0,
          password: 0,
          create_date: 0,
          d_flag: 0,
        }
      ).sort({ full_name: 1 });
      res.send({
        status: res.statusCode,
        message: "successfully all user information",
        data: result,
      });
    } catch (error) {
      res.send({
        status: res.statusCode,
        message: error.message,
        data: 1,
      });
    }
  },
  //GET ALL Admin INFORMATION
  getAllAdmin: async (req, res) => {
    try {
      const result = await User.find(
        { d_flag: false, type: 2 },
        {
          __v: 0,
          date: 0,
          updated_date: 0,
          password: 0,
          create_date: 0,
          d_flag: 0,
        }
      ).sort({ full_name: 1 });
      res.send({
        status: res.statusCode,
        message: "successfully all Admin information",
        data: result,
      });
    } catch (error) {
      res.send({
        status: res.statusCode,
        message: error.message,
        data: 1,
      });
    }
  },
  //CREATE USER ACCOUNT
  createUser: async (req, res) => {
    const email_id = req.body.email_id;
    // console.log("email id : " + email_id);
    const c = await User.countDocuments({ email_id: email_id, d_flag: false });
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
  // FIND USER USING EMAIL ID AND PASSWORD
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
          token: token,
          data: result,
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
  //UPDATE USER DATA
  updateUser: async (req, res, next) => {
    try {
      const id = req.body._id;
      let newQuery = JSON.parse(JSON.stringify(req.body));

      const option = { new: true };
      newQuery.updated_date = new Date();
      // console.log(newQuery)
      const result = await User.findOneAndUpdate(
        { _id: id, email: req.body.email_id, d_flag: false },
        newQuery,
        option
      );
      if (!result) {
        // throw createError(404, "User does not exist.");
        res.send({
          status: 404,
          message: "User does not exist.",
        });
      }
      res.send({
        status: res.statusCode,
        message: "successfully updated user data",
        data: result,
      });
    } catch (error) {
      res.send({
        status: 504,
        message: "User does not updated.",
      });
    }
  },
  //DELETE USER USING USER ID
  deleteUserById: async (req, res, next) => {
    try {
      const id = req.params.id;

      const result = await User.findOneAndDelete({ _id: id });
      if (!result) {
        res.send({
          status: 500,
          message: "Your email not find",
          data: 0,
        });
      } else {
        const data = await Products.deleteMany({ vendor_id: id });
        res.send({
          status: res.statusCode,
          message: "successfully deleted information ",
          data: 1,
        });
      }
    } catch (error) {
      res.send({
        status: res.statusCode,
        message: "successfully deleted information ",
        data: id,
      });
    }
    // res.send("deleting a single product ")
  },
  //FORGET PASSWORD USING USER ID
  forgetPassword: async (req, res, next) => {
    try {
      let newQuery = JSON.parse(JSON.stringify(req.body));
      const option = { new: true };
      newQuery.updated_date = new Date();
      // console.log(newQuery)
      const result = await User.findOneAndUpdate(
        { email_id: req.body.email_id, d_flag: false },
        newQuery,
        option
      );
      if (!result) {
        // throw createError(404, "User does not exist.");
        res.send({
          status: 500,
          message: "User does not exist.",
        });
      } else {
        res.send({
          status: res.statusCode,
          message: "successfully updated user data",
          data: 1,
        });
      }
    } catch (error) {
      res.send({
        status: 504,
        message: "User does not forget password.",
      });
    }
  },

  //find user by id
  findUserById: async (req, res, next) => {
    try {
      const id = req.params.id;

      const result = await User.findOne(
        { _id: id, d_flag: false },
        { password: 0 }
      );
      // console.log(student)
      if (!result) {
        res.send({
          status: 500,
          message: "successfully find user information",
          data: 0,
        });
      }
      res.send({
        status: "SUCCESSFULL",
        message: "successfully find user information",
        data: result,
      });
    } catch (error) {
      // console.log(error.message)
      if (error instanceof Mongoose.CastError) {
        res.send({
          status: req.statusCode,
          message: "please try again",
          data: result,
        });
      }
    }
  },
};
