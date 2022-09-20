import mongoose from "mongoose";
import config from "../config.js";

await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options);

class ContenedorMongoDb {
  constructor(nombreColeccion, esquema) {
    this.coleccion = mongoose.model(nombreColeccion, esquema);
  }

  async getItemById(id) {
    const elemento = await this.coleccion.find({ _id: id });
    return elemento[0];
  }

  async getAllItems() {
    const elementos = await this.coleccion.find({});
    return elementos;
  }

  async createNewItem(nuevoElem) {
    const elemento = await this.coleccion.insertMany(nuevoElem);
    console.log(elemento);
    return elemento[0];
  }

  async updateItem(id, nuevoElem) {
    console.log(nuevoElem);
    await this.coleccion.updateOne({ _id: id }, { $set: { ...nuevoElem } });
    const elemento = await this.coleccion.find({ _id: id });
    return elemento;
  }

  async deleteItem(id) {
    await this.coleccion.deleteOne({ _id: id });
  }

  async deleteAll() {
    await this.coleccion.deleteMany({});
  }
}

export default ContenedorMongoDb;
