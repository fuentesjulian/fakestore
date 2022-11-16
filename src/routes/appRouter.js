// router para visualizar los items
import express from "express";
const { Router } = express;
const appRouter = new Router();

appRouter.get("/", (req, res) => {
  const nombre = req.user.nombre;
  res.render("index", { nombre });
});

export default appRouter;
