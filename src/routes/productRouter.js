const express = require("express");
const { Router } = express;
const productRouter = new Router();
const productController = require("../controllers/productController");
const authService = require("../services/authService");

productRouter
  .get("/", productController.getAllProducts)
  .get("/:id", productController.getProductById)
  .post("/", authService, productController.createNewProduct)
  .put("/:id", authService, productController.updateProduct)
  .delete("/:id", authService, productController.deleteProduct);

module.exports = productRouter;
