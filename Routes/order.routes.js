const express = require("express");
const app = express();
const router = express.Router();
const token = require("../jwttoken");

const db = require("../Controller/order.controller");
app.use(express.json());

//post  :create new order
router.post("/Order/create_Order", token, db.createOrder);

//get   :customer order
router.get("/Order/customer_Order/:id", token, db.getAllOrderForCustomer);

//get   :vendor order products edit for status
router.get("/Order/vendor_Order_products/:id", token, db.getAllOrderForVendor);
//get   :vendor order
router.post(
  "/Order/vendor_Order_edit_products",
  token,
  db.vendorOrderEditProducts
);

//get   :customer order products
router.post(
  "/Order/customer_Order_Products",
  token,
  db.getAllOrderForCustomerProducts
);
// //GET :all Order Data without token
// router.get("/Order/fetch_all_Order_without_token", db.getAllOrder);

// //POST : add new Order in database
// router.post("/Order/add_product", token, db.createOrder);

// //POST : update Order in database
// router.post("/Order/edit_product", token, db.updateOrder);

// //GET : list of Order using vendor id
// router.get("/Order/list_Order/:id", token, db.vendorOrder);

// //GET : list of Order for Order page using vendor id
// router.get("/Order/Order_page/:id", token, db.getOrderForPage);

// //GET : list of Order for vendor page using vendor id
// router.get("/Order/vendor_page/:id", token, db.getVendorForPage);

// //GET : delete product by product id
// router.get("/Order/delete_Order/:id", token, db.deleteProductById);

module.exports = router;
