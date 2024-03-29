const express = require("express");
const app = express();
const cors = require("cors");
const createError = require("http-errors");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
console.log("panthil malaviya");
// Database connection
require("./initdb")();
const PORT = process.env.PORT || 5050;

//User Router
const UserRouter = require("./Routes/user.routes");
app.use("/", UserRouter);

//Products Router
const ProductsRouter = require("./Routes/products.routes");
app.use("/", ProductsRouter);

//Auction Router
const Auction = require("./Routes/auction.routes");
app.use("/", Auction);

//Order Router
const OrderRouter = require("./Routes/order.routes");
app.use("/", OrderRouter);

app.listen(PORT, () => {
  console.log("Server Started on port : ", PORT );
});
