// router para los productos
import express from "express";
const { Router } = express;
const productRouter = new Router();
// cargo el controlador de productos, con las funciones que van a correr por cada ruta
import * as productController from "../controllers/productController.js";
// cargo el servicio de autentificacion que checkea si estoy loggeado
import { authService } from "../services/authService.js";

// declaro los metodos y las rutas que voy a utilizar para los productos
productRouter
  .get("/", productController.getAllProducts)
  .get("/:id", productController.getProductById)
  // las siguientes 3 rutas requieren que esté loggeado
  .post("/", authService, productController.createNewProduct)
  .put("/:id", authService, productController.updateProduct)
  .delete("/:id", authService, productController.deleteProduct);

export default productRouter;
