import express from "express";
import productRouter from "./routes/productRouter.js";
import cartRouter from "./routes/cartRouter.js";
import { validRouteService } from "./services/validRouteService.js";

const app = express();

// configuro el servidor
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// configuro la ruta estatica
app.use(express.static("public"));

//--------------------------------------------
// configuro sesion
import session from "./middlewares/session.js"
app.use(session);

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
import {isLoggedIn} from "./middlewares/authentication.js"

//--------------------------------------------
// authRouter donde esta la estrategia de autenticacion
const authRouter = express.Router();
import { configAuthRouter } from "./routes/authRouter.js";
configAuthRouter(authRouter, passport);
app.use("/", authRouter);

// configuro los routers
app.use("/api/productos", productRouter);
app.use("/api/carrito", cartRouter);

// si usa otra ruta arrojo error
app.all("*", validRouteService);

// exporto app
export default app;
