const express = require("express");
const app = express();
const cors = require('cors')
const createError = require('http-errors')
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
console.log("panthil malaviya");
// Database connection
require("./initdb")();
const PORT = process.env.PORT || 5050;

//User Router
const UserRouter = require("./Routes/user.routes");
app.use("/", UserRouter);

app.listen(PORT, () => {
  console.log("Server Started on port http://localhost:" + PORT + "/");
  console.log(process.env.MONGODB_URL);
});
