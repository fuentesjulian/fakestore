// router para el carrito
import express from "express";
const { Router } = express;
const cartRouter = new Router();
// cargo el controlador del cart, con las funciones que van a correr por cada ruta
import * as cartController from '../controllers/cartController.js'  

// declaro los metodos y las rutas que voy a utilizar para el cart
cartRouter.get("/", cartController.getAllCarts);
cartRouter.post("/", cartController.createNewCart);
cartRouter.delete("/:id", cartController.deleteCart);
cartRouter.get("/:id/productos", cartController.getCart);
cartRouter.post("/:id/productos", cartController.addProduct);
cartRouter.delete("/:id/productos/:id_prod", cartController.deleteProduct);

export default cartRouter;
