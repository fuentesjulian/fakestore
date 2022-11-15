// servicio de productos que corre las funciones epecificas a cada producto
// traigo un FileContainer para interactuar con productDB.json
// import { FileContainer } from "../database/FileContainer.js";
// const productContainer = new FileContainer("src/database/productDB.json");

import { productosDao as productContainer } from "../daos/index.js";

// traigo un producto por id
const getProductById = async (id) => {
  const product = await productContainer.getById(id);
  return product;
};

// traigo todos los productos
const getAllProducts = async () => {
  const allProducts = await productContainer.getAll();
  return allProducts;
};

// creo un nuevo producto
const createNewProduct = async (body) => {
  // hago un destructuring para obtener las variables que necesito del body
  const { name, description, code, thumbnail, price, stock } = body;
  const timestamp= Date.now()
  // checkeo que todas existan
  if (name && description && code && thumbnail && price && stock) {
    const newProduct = await productContainer.createNew({ name, description, code, thumbnail, price: parseFloat(price), stock,timestamp });
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
    const updatedProduct = await productContainer.updateById(id, newItemData);
    return updatedProduct;
  }
};

// elimino un producto
const deleteProduct = async (id) => {
  await productContainer.deteleteById(id);
};

export { getProductById, getAllProducts, createNewProduct, updateProduct, deleteProduct };
