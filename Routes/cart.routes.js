const express = require("express");
const app = express();
const router = express.Router();
const token = require("../jwttoken");

const db = require("../Controller/cart.controller");
app.use(express.json());

//GET  :all Cart Products data
router.get("/cart/fetch_all_cart_products/:id", token, db.getAllCartProducts);

//POST : add new products in database
router.post("/cart/add_cart_product", token, db.addToCart);

// //GET :all products Data without token
// router.get("/products/fetch_all_products_without_token", db.getAllProducts);

//POST : update cart products
router.post("/cart/edit_cart_product", token, db.updateCartProductsById);

//GET : delete cart
router.get("/cart/delete_cart/:id", token, db.deleteCartById);

//GET : delete cart products by id
router.get("/cart/delete_products/:id", token, db.deleteCartProductById);

module.exports = router;
