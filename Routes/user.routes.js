const express = require("express");
const app = express();
const router = express.Router();
const token = require("../jwttoken");

const db = require("../Controller/user.controller");
app.use(express.json());

//GET  :all user data
router.get("/users/fetch_users", token, db.getAllUser);

//GET  :all Admin data
router.get("/admin/fetch_admin", token, db.getAllAdmin);

//POST :create user account
router.post("/users/create_user", db.createUser);

//GET ONE BY ID
router.get("/users/fetch_users/:id", token, db.findUserById);

//POST :login using email and password
router.post("/authorise/login", db.findUser);

//POST :update user information
router.post("/user/update_user", token, db.updateUser);

//GET :delete user account (only delete product and auction products )
router.get("/users/deleteUser/:id", token, db.deleteUserById);

//POST :forget Password using email id
router.post("/authorise/forgot_password", db.forgetPassword);
module.exports = router;
