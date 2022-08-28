const express = require("express");
const { Router } = express;

const cartRouter = new Router();

cartRouter.post("/", (req, res) => {
  res.send(`Creo un carrito y devuelvo su id`);
});
cartRouter.delete("/:id", (req, res) => {
  res.send(`Borro el carrito id ${req.params.id}`);
});
cartRouter.get("/:id/productos", (req, res) => {
  res.send(`Obtengo los productos del carrito id ${req.params.id}`);
});
cartRouter.post("/:id/productos", (req, res) => {
  res.send(`Agrego un producto al carrito id ${req.params.id}`);
});
cartRouter.delete("/:id/productos/:id_prod", (req, res) => {
  res.send(`Elimino el producto id ${req.params.id_prod} del carrito id ${req.params.id}`);
});

module.exports = cartRouter;