import express from "express";
import productRouter from "./routes/productRouter.js";
import cartRouter from "./routes/cartRouter.js";
import { validRouteService } from "./services/validRouteService.js";

const app = express();

// configuro el servidor
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// configuro las rutas estatica
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
//--------------------------------------------
// configuro sesion
import session from "./middlewares/session.js";
app.use(session);

//--------------------------------------------
// configuro multer
import multer from "multer";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage: storage });

//--------------------------------------------
// configuro passport
import passport from "passport";
import * as userService from "./services/userService.js";
import passportConfig from "./config/passport.js";
passportConfig(passport, userService);
// inicio passport y lo vinculo a la sesión
app.use(passport.initialize());
app.use(passport.session());

//--------------------------------------------
// configuro el engine de las views
app.set("views", "./views");
app.set("view engine", "ejs");

//--------------------------------------------
// Middlewares de auth
import { isLoggedIn } from "./middlewares/authentication.js";

//--------------------------------------------
// authRouter donde esta la estrategia de autenticacion
const authRouter = express.Router();
import { configAuthRouter } from "./routes/authRouter.js";
configAuthRouter(authRouter, upload, passport);
app.use("/", authRouter);

import profileRouter from "./routes/profileRouter.js";
import itemRouter from "./routes/itemRouter.js";
import appRouter from "./routes/appRouter.js";
// configuro los routers
app.use("/api/productos", productRouter);
app.use("/api/carrito", cartRouter);
app.use("/profile", isLoggedIn, profileRouter);
app.use("/item", isLoggedIn, itemRouter);
import checkoutRouter from "./routes/checkoutRouter.js";
app.use("/checkout", isLoggedIn, checkoutRouter);
app.use("/", isLoggedIn, appRouter);

// si usa otra ruta arrojo error
app.all("*", validRouteService);

// exporto app
export default app;
