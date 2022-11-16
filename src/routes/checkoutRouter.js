// router para el carrito
import express from "express";
const { Router } = express;
const checkoutRouter = new Router();
import * as cartService from "../services/cartService.js";
import * as emailer from "../services/emailer.js";
import * as sms from "../services/sms.js";
import * as whatsapp from "../services/whatsapp.js";

checkoutRouter
  .get("/:id", async (req, res) => {
    const nombre = req.user.nombre;
    const cartId = req.params.id;
    const cart = await cartService.getCart(cartId);
    res.render("checkout", { nombre, cart, cartId });
  })
  .post("/:id", async (req, res) => {
    const cartId = req.params.id;
    const userId = req.user.id;
    const cart = await cartService.billCart(cartId, userId);
    emailer.nuevoPedido(req.user, cart);
    sms.enviarPedido(req.user.telefono, cartId);
    whatsapp.enviarPedido(req.user);
    res.send(cart);
  });

export default checkoutRouter;
