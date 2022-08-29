// router para los productos
const express = require("express");
const { Router } = express;
const productRouter = new Router();
// cargo el controlador de productos, con las funciones que van a correr por cada ruta
const productController = require("../controllers/productController");
// cargo el servicio de autentificacion que checkea si estoy loggeado
const authService = require("../services/authService");

// declaro los metodos y las rutas que voy a utilizar para los productos
productRouter
  .get("/", productController.getAllProducts)
  .get("/:id", productController.getProductById)
  // las siguientes 3 rutas requieren que esté loggeado
  .post("/", authService, productController.createNewProduct)
  .put("/:id", authService, productController.updateProduct)
  .delete("/:id", authService, productController.deleteProduct);

module.exports = productRouter;
