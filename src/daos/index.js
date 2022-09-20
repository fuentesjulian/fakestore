let productosDao;
let carritosDao;

const persistencia = "mongodb";
//switch (process.env.PERS) {
switch (persistencia) {
  case "json":
    const { default: ProductosDaoArchivo } = await import("./productos/ProductosDaoArchivo.js");
    const { default: CarritosDaoArchivo } = await import("./carritos/CarritosDaoArchivo.js");

    productosDao = new ProductosDaoArchivo();
    carritosDao = new CarritosDaoArchivo();
    break;
  case "firebase":
    break;
  case "mongodb":
    const { default: ProductosDaoMongoDb } = await import("./productos/ProductosDaoMongoDb.js");
    const { default: CarritosDaoMongoDb } = await import("./carritos/CarritosDaoMongoDb.js");

    productosDao = new ProductosDaoMongoDb();
    carritosDao = new CarritosDaoMongoDb();
    break;
  case "mariadb":
    break;
  case "sqlite3":
    break;
  default:
    break;
}

export { productosDao, carritosDao };
