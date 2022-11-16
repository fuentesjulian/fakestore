// importo server.js
import app from "./server.js";
import Yargs from "yargs";
import cluster from "cluster";
import os from "os";
import logger from "./log/logger.js";

const numCPUs = os.cpus().length;

//--------------------------------------------
// funcion runCluster que corre el servidor como cluster
// toma como parametro el puerto
const runCluster = (port) => {
  if (cluster.isPrimary) {
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
  } else {
    // corro app
    const server = app.listen(port, () => {
      logger.info(
        `Servidor http escuchando en el puerto ${
          server.address().port
        } en modo cluster`
      );
    });
    server.on("error", (error) => logger.error(`Error en servidor ${error}`));
  }
};

//--------------------------------------------
// funcion runCluster que corre el servidor normalmente
// toma como parametro el puerto
const runNormal = (port) => {
  // corro app
  const server = app.listen(port, () => {
    logger.info(
      `Servidor http escuchando en el puerto ${
        server.address().port
      } en modo normal`
    );
  });
  server.on("error", (error) => logger.error(`Error en servidor ${error}`));
};

// corro app
//--------------------------------------------
// inicio el servidor
const yargs = Yargs(process.argv.slice(2));
const args = yargs
  .alias({ p: "port", m: "mode" })
  .default({ port: 8080, mode: "NORMAL" }).argv;

const PORT = process.env.PORT || args.port || 8080;
const MODE = args.mode;

switch (MODE) {
  case "CLUSTER":
    runCluster(PORT);
    break;

  case "NORMAL":
    runNormal(PORT);
    break;
  default:
}
