// router para el carrito
const express = require("express");
const { Router } = express;
const cartRouter = new Router();
// cargo el controlador del cart, con las funciones que van a correr por cada ruta
const cartController = require("../controllers/cartController")

// declaro los metodos y las rutas que voy a utilizar para el cart
cartRouter.post("/", cartController.createNewCart);
cartRouter.delete("/:id", cartController.deleteCart);
cartRouter.get("/:id/productos", cartController.getCart);
cartRouter.post("/:id/productos", cartController.addProduct);
cartRouter.delete("/:id/productos/:id_prod", cartController.deleteProduct);

module.exports = cartRouter;