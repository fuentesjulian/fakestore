const express = require("express");
const { Router } = express;
const cartRouter = new Router();
const cartController = require("../controllers/cartController")

cartRouter.post("/", cartController.createNewCart);
cartRouter.delete("/:id", cartController.deleteCart);
cartRouter.get("/:id/productos", cartController.getCartProducts);
cartRouter.post("/:id/productos", cartController.addCartProduct);
cartRouter.delete("/:id/productos/:id_prod", cartController.deleteCartProduct);

module.exports = cartRouter;