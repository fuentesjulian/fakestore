// uso la clase ProductosApi del template del profe
class ContenedorMemoria {
  constructor() {
    this.elementos = [];
    this.id = 0;
  }

  getItemById(id) {
    const producto = this.elementos.find((prod) => prod.id === parseInt(id));
    return producto;
  }

  getAllItems() {
    return this.elementos;
  }

  createNewItem(prod) {
    this.elementos.push({ id: ++this.id, ...prod });
    return this.getItemById(this.id);
  }

  updateItem(id, prod) {
    this.elementos = this.elementos.map((producto) => {
      if (producto.id === parseInt(id)) return { id: parseInt(id), ...prod };
    });
    return this.getItemById(id);
  }

  deleteItem(id) {
    this.elementos = this.elementos.filter((prod) => prod.id != parseInt(id));
  }

  deleteAll() {
    this.elementos = [];
  }
}
export default ContenedorMemoria;
