const express = require("express");
const productRouter = require("./routes/productRouter");
const cartRouter = require("./routes/cartRouter");
const app = express();

// configuro el servidor
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// configuro la ruta estatica
app.use(express.static("public"));

// configuro los routers
app.use("/api/productos", productRouter);
app.use("/api/carrito", cartRouter);

// exporto app
module.exports = app;
