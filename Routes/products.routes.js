const express = require("express");
const app = express();
const router = express.Router();
const token = require("../jwttoken");

const db = require("../Controller/products.constroller");
app.use(express.json());

//GET  :all Products data
router.get("/products/fetch_all_products", token, db.getAllProducts);

//POST : add new products in database
router.post("/products/add_product", token, db.createProducts);

//GET : list of products using vendor id
router.get("/products/list_products/:id", token, db.vendorProducts);

//GET : delete product by product id
router.get("/products/delete_products/:id", token, db.deleteProductById);

module.exports = router;
