const express = require("express");
const {uploadProduct, getAllProducts} = require("../controller/productController");

const router = express.Router();
router.post('/upload', uploadProduct);
router.post('/getall', getAllProducts);

module.exports = router;