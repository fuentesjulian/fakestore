const express = require("express");
const { Router } = express;
const productRouter = new Router();
const productController = require("../controllers/productController");

productRouter
  .get("/", productController.getAllProducts)
  .get("/:id", productController.getProductById)
  .post("/", productController.createNewProduct)
  .put("/:id", productController.updateProduct)
  .delete("/:id", productController.deleteProduct);

module.exports = productRouter;
