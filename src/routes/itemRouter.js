// router para visualizar los items
import express from "express";
const { Router } = express;
const itemRouter = new Router();
import * as productService from "../services/productService.js";

itemRouter.get("/:id", async (req, res) => {
  const nombre = req.user.nombre;
  const id = req.params.id;
  const productData = await productService.getProductById(id);
  res.render("item", { productData, nombre });
});

export default itemRouter;
