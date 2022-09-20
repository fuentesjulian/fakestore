// servicio de productos que corre las funciones epecificas a cada producto
// traigo un FileContainer para interactuar con productDB.json
import { FileContainer } from "../database/FileContainer.js";
const productContainer = new FileContainer("src/database/productDB.json");

// traigo un producto por id
const getProductById = async (id) => {
  const product = await productContainer.getItemById(id);
  return product;
};

// traigo todos los productos
const getAllProducts = async () => {
  const allProducts = await productContainer.getAllItems();
  return allProducts;
};

// creo un nuevo producto
const createNewProduct = async (body) => {
  // hago un destructuring para obtener las variables que necesito del body
  const { name, description, code, thumbnail, price, stock } = body;
  // checkeo que todas existan
  if (name && description && code && thumbnail && price && stock) {
    const newProduct = await productContainer.createNewItem({ name, description, code, thumbnail, price: parseFloat(price), stock });
    return newProduct;
  }
};

// actualizo un producto
const updateProduct = async (id, body) => {
  // hago un destructuring para obtener las variables que necesito del body
  const { name, description, code, thumbnail, price, stock } = body;
  // checkeo que todas existan
  if (name && description && code && thumbnail && price && stock) {
    const newItemData = { name, description, code, thumbnail, price: parseFloat(price), stock };
    const updatedProduct = await productContainer.updateItem(id, newItemData);
    return updatedProduct;
  }
};

// elimino un producto
const deleteProduct = async (id) => {
  await productContainer.deleteItem(id);
};

export { getProductById, getAllProducts, createNewProduct, updateProduct, deleteProduct };
