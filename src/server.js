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

// configuro los routers
app.use("/api/productos", productRouter);
app.use("/api/carrito", cartRouter);

// si usa otra ruta arrojo error
app.all("*", validRouteService);

// exporto app
export default app;
