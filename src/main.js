// importo server.js
import app from "./server.js"
// declaro el puerto
const PORT = process.env.PORT || 8080;
// corro app
const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
