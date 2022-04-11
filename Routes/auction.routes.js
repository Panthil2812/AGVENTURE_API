const express = require("express");
const app = express();
const router = express.Router();
const token = require("../jwttoken");

const db = require("../Controller/auction.controller");
app.use(express.json());

//post  :Create auction products
router.post("/auction/crate_auction_product", token, db.createAuctionProducts);

//Get : Get all auction products
router.get("/auction/get_auction_products", db.getAllAuctionProducts);

//Get : Get all auction products
router.get("/auction/auction_page/:id", token, db.getAuctionForPage);
module.exports = router;
