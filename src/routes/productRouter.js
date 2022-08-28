const express = require("express");
const { Router } = express;

const productRouter = new Router();

productRouter.get("/", (req, res) => {
  res.send(`Obtengo todos los productos`);
});
productRouter.get("/:id", (req, res) => {
  res.send(`Obtengo el producto id ${req.params.id}`);
});
productRouter.post("/", (req, res) => {
  res.send(`Agrego un producto, solo para admins`);
});
productRouter.put("/:id", (req, res) => {
  res.send(`Modifico el producto id ${req.params.id}, solo para admins`);
});
productRouter.delete("/:id", (req, res) => {
  res.send(`Elimino el producto id ${req.params.id}, solo para admins`);
});

module.exports = productRouter;