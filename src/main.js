// importo server.js
const app = require("./server");
// declaro el puerto
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
