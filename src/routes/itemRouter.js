// router para visualizar los items
import express from "express";
const { Router } = express;
const itemRouter = new Router();
import * as productService from "../services/productService.js";

itemRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const productData = await productService.getProductById(id);
  res.render("item", { productData });
});

export default itemRouter;
