// router para los productos
import express from "express";
const { Router } = express;
const profileRouter = new Router();
import { isLoggedIn } from "../middlewares/authentication.js";

profileRouter.get("/", isLoggedIn, (req, res) => {
  res.render("profile", { user: req.user });
});

export default profileRouter;
