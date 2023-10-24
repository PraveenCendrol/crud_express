const express = require("express");
const productsContoller = require("../controller/products");

const router = express.Router();
router.route("/").get(productsContoller.getProducts);

module.exports = router;
