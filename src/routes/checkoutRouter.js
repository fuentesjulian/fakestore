// router para el carrito
import express from "express";
const { Router } = express;
const checkoutRouter = new Router();
import * as cartService from "../services/cartService.js";

checkoutRouter
  .get("/:id", async (req, res) => {
    const nombre = req.user.nombre;
    const cartId = req.params.id;
    const cart = await cartService.getCart(cartId);
    res.render("checkout", { nombre, cart, cartId});
  })
  .post("/:id", async (req, res) => {
    console.log("checkout");
    const cartId = req.params.id;
    const cart = await cartService.billCart(cartId);
    res.send(cart);
  });

export default checkoutRouter;
