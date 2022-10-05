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
      console.log(" getAllUser : calling .....");
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
      console.log("getAllUser : successfully ....");
    } catch (error) {
      res.send({
        status: res.statusCode,
        message: error.message,
        data: 1,
      });
      console.log("getAllUser : error message: ", error.message);
    }
  },
  //GET ALL VENDOR INFORMATION
  getAllVendor: async (req, res) => {
    try {
      console.log(" getAllVendor : calling .....");
      const result = await User.find(
        { d_flag: false, type: 1 },
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
        message: "successfully all vendor information",
        data: result,
      });
      console.log("getAllVendor : successfully ....");
    } catch (error) {
      res.send({
        status: res.statusCode,
        message: error.message,
        data: 1,
      });
      console.log("getAllVendor : error message: ", error.message);
    }
  },
  //GET ALL Admin INFORMATION
  getAllAdmin: async (req, res) => {
    try {
      console.log("getAllAdmin : calling .....");
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
      console.log("getAllAdmin : successfully ....");
    } catch (error) {
      res.send({
        status: res.statusCode,
        message: error.message,
        data: 1,
      });
      console.log("getAllAdmin: error message: ", error.message);
    }
  },
  //CREATE USER ACCOUNT
  createUser: async (req, res) => {
    const email_id = req.body.email_id;
    // console.log("email id : " + email_id);
    // const c = await User.countDocuments({ email_id: email_id, d_flag: false });
    const c = 0;
    console.log("createuser : calling");

    try {
      // req.body.password = cry.encrypt(req.body.password);
      if (c == 0) {
        const user = new User(req.body);

        const result = await user.save();
        res.send({
          status: res.statusCode,
          message: "successfully account created",
        });
        console.log("createuser : successfully ...");
      } else {
        //next(createError(500, "email already exists"));
        res.send({
          status: 500,
          message: "email is already added",
        });
        console.log("createuser : email is already added ......");
      }
    } catch (error) {
      // console.log(error);
      res.send({
        status: res.statusCode,
        message: "Not created your account",
      });
      console.log("createuser : error message : ", error.message);
    }
  },
  // FIND USER USING EMAIL ID AND PASSWORD
  findUser: async (req, res) => {
    try {
      console.log("findUser: calling..............");
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
        console.log("findUser : successfully ....");
      } else {
        res.send({
          status: 500,
          message: "email not found",
          data: 1,
        });
        console.log("findUser : email not found ......");
      }
    } catch (error) {
      res.send({
        status: 504,
        message: "some error in api ",
      });
      console.log("findUser: error message: ", error.message);
    }
  },
  //UPDATE USER DATA
  updateUser: async (req, res, next) => {
    try {
      console.log("updateUser : calling .....");
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
        console.log("updateUser : User does not exist. ......");
      }
      res.send({
        status: res.statusCode,
        message: "successfully updated user data",
        data: result,
      });
      console.log("updateUser : successfully ....");
    } catch (error) {
      res.send({
        status: 504,
        message: "User does not updated.",
      });
      console.log("updateUser: error message: ", error.message);
    }
  },
  //DELETE USER USING USER ID
  deleteUserById: async (req, res, next) => {
    console.log("deleteUserById : calling .....");
    try {
      const id = req.params.id;

      const result = await User.findOneAndDelete({ _id: id });
      if (!result) {
        res.send({
          status: 500,
          message: "Your email not found",
          data: 0,
        });
        console.log("deleteUserById : Your email not found ......");
      } else {
        const data = await Products.deleteMany({ vendor_id: id });
        res.send({
          status: res.statusCode,
          message: "successfully deleted information ",
          data: 1,
        });
        console.log("deleteUserById : successfully ....");
      }
    } catch (error) {
      res.send({
        status: res.statusCode,
        message: "error deleted information ",
        data: id,
      });
      console.log("deleteUserById: error message: ", error.message);
    }
    // res.send("deleting a single product ")
  },
  //FORGET PASSWORD USING USER ID
  forgetPassword: async (req, res, next) => {
    console.log("forgetPassword : calling .....");
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
        console.log("forgetPassword : User does not exist. ......");
      } else {
        res.send({
          status: res.statusCode,
          message: "successfully updated user data",
          data: 1,
        });
        console.log("forgetPassword : successfully ....");
      }
    } catch (error) {
      res.send({
        status: 504,
        message: "User does not forget password.",
      });
      console.log("forgetPassword: error message: ", error.message);
    }
  },

  //find user by id
  findUserById: async (req, res, next) => {
    console.log("findUserById : calling .....");
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
          message: "not found user information",
          data: 0,
        });
        console.log("findUserById: not found user information ......");
      } else {
        res.send({
          status: req.statusCode,
          message: "successfully find user information",
          data: result,
        });
        console.log(" findUserById : successfully ....");
      }
    } catch (error) {
      if (error instanceof Mongoose.CastError) {
        res.send({
          status: req.statusCode,
          message: "please try again",
          data: result,
        });
        console.log("findUserById : error message: ", error.message);
      }
    }
  },
};
