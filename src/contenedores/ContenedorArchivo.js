import { promises as fs } from 'fs';

export class ContenedorArchivo {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async getItemById(id) {
    // corro getAllItems para obtener todos los items en forma de array
    const items = await this.getAllItems();
    // hago un return con un find para que me devuelva el id
    // por las dudas hago un parseInt de id, es innecesario ahora,
    // pero puede que algun form envie el id como string
    // si no encuentra nada hago que retorne false, me parecio prolijo plantearlo asi
    return items.find((item) => item.id === parseInt(id)) ?? false;
  }

  async getAllItems() {
    try {
      // leo el archivo
      const data = await fs.readFile(this.filePath, "utf-8");
      // si el archivo tiene datos hago el parse, si no tiene datos falla el parse y cae en el catch
      // aca hay una oportunidad de diferenciar la falla de lectura vs la falla del parseo...
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async createNewItem(item) {
    // corro getAllItems para obtener todos los items en forma de array
    const items = await this.getAllItems();
    // calculo el #id. Si el array tiene longitud, busco el id del ultimo item dentro de items
    // si el array tiene longitud cero (esta vacia) por default el id es 1
    const id = items.length > 0 ? items[items.length - 1].id + 1 : 1;
    // hago un spread del objeto y le agrego el id
    item = { ...item, id };
    // agrego el objeto al array de items
    items.push(item);
    // convierto a string el array de items
    const data = JSON.stringify(items, null, 2);
    // corro las instrucciones para escribir el archivo
    try {
      await fs.writeFile(this.filePath, data);
      // el return es el item
      return item;
    } catch (error) {
      console.error(error);
    }
  }

  async updateItem(id, itemData) {
    // corro getAllItems para obtener todos los items en forma de array
    let items = await this.getAllItems();
    // primero checkea que exista un producto con el id indicado, sino no puede actualizar
    if (!items.some((item) => parseInt(item.id) === parseInt(id))) return { error: "producto no encontrado" };
    // actualizo con un map al objeto del array que tenga un id que coincida con el id que recibo como parametro
    items = items.map((item) => {
      // me aseguro de cargarle el mismo timestamp y el mismo id que ya tenia
      if (item.id === parseInt(id)) return { ...itemData, id: item.id, timestamp: item.timestamp };
      // devuelvo el prod
      return item;
    });
    // convierto a string el array de items
    const data = JSON.stringify(items, null, 2);
    // corro las instrucciones para escribir el archivo
    try {
      await fs.writeFile(this.filePath, data);
      return items.find((item) => item.id === parseInt(id));
    } catch (error) {
      console.error(error);
    }
  }

  async deleteItem(id) {
    // corro getAll para obtener todos los items en forma de array
    let items = await this.getAllItems();
    // reemplazo el array de items por un array que no contenga el item con el id indicado
    // hago un parseInt por las dudas: puede que en el futuro reciba un string en vez q un int
    items = items.filter((item) => item.id != parseInt(id));
    // hago el JSON
    const data = JSON.stringify(items, null, 2);
    try {
      await fs.writeFile(this.filePath, data);
    } catch (error) {
      console.error(error);
    }
  }

  async deleteAll() {
    await fs.writeFile(this.filePath, "");
  }
}

export default ContenedorArchivo;