import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js";

class CarritosDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super("carritos", {
      products: { type: [], required: true }
    });
  }

  async createNewItem(carrito = { products: [] }) {
    return super.createNewItem(carrito);
  }

}

export default CarritosDaoMongoDb;
