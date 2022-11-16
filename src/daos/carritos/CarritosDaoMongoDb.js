import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js";

class CarritosDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super("carritos", {
      products: { type: [], required: true },
      uid: { type: String },
      status: { type: String },
    });
  }

  async createNewItem(carrito = { products: [] }) {
    return super.createNewItem(carrito);
  }
}

export default CarritosDaoMongoDb;
