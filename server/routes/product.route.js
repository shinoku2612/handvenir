const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/product.controller");

router.post("/add", ProductController.addProduct);
router.get("/all", ProductController.getAllProduct);
router.get("/get/:productId", ProductController.getProductById);
router.get("/single/:slug", ProductController.getProductBySlug);
router.get("/find", ProductController.findProduct);
router.get("/filter", ProductController.filterProduct);
router.put("/rating/:productId", ProductController.rateProduct);

module.exports = router;
