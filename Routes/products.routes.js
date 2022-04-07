const express = require("express");
const app = express();
const router = express.Router();
const token = require("../jwttoken");

const db = require("../Controller/products.controller");
app.use(express.json());

//GET  :all Products data
router.get("/products/fetch_all_products", token, db.getAllProducts);

//GET :all products Data without token
router.get("/products/fetch_all_products_without_token", db.getAllProducts);

//POST : add new products in database
router.post("/products/add_product", token, db.createProducts);

//POST : update products in database
router.post("/products/edit_product", token, db.updateProducts);

//GET : list of products using vendor id
router.get("/products/list_products/:id", token, db.vendorProducts);

//GET : list of products for products page using vendor id
router.get("/products/products_page/:id", token, db.getProductsForPage);

//GET : list of products for vendor page using vendor id
router.get("/products/vendor_page/:id", token, db.getVendorForPage);

//GET : delete product by product id
router.get("/products/delete_products/:id", token, db.deleteProductById);

module.exports = router;
