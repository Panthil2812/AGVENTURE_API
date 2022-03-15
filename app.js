const express = require("express");
const app = express();
// const createError = require('http-errors')
const dotenv = require("dotenv").config();
// const bodyParser = require('body-parser')
// app.use(bodyParser.urlencoded({ extended: false }));

console.log("panthil malaviya");
// Database connection
require("./initdb")();
const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log("Server Started on port http://localhost:" + PORT + "/");
  console.log(process.env.MONGODB_URL);
});
