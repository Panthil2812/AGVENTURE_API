const express = require("express");
const app = express();
const router = express.Router();

const db = require("../Controller/user.controller");
app.use(express.json());

//GET  :all user data
router.get("/users/fetch_users", db.getAllUser);

//POST :create user account
router.post("/users/create_user", db.createUser);

//POST :login using email and password
router.post("/authorise/login", db.findUser);

module.exports = router;
