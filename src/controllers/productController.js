// controlador de productos, corre las funciones necesarias para cada response del router de productos
// traigo el servicios de productos que corre las funciones de los productos
import * as productService from "../services/productService.js";

const getAllProducts = async (req, res) => {
  // traigo todos los productos
  const allProducts = await productService.getAllProducts();
  // envio los productos
  res.send(allProducts);
};

const getProductById = async (req, res) => {
  // traigo unicamente el producto con el id especificado en params
  const product = await productService.getProductById(req.params.id);
  // envio el producto
  res.send(product);
};

const createNewProduct = async (req, res) => {
  // desestructuro el req para quedarme con el body
  const { body } = req;
  // creo un producto, enviando el body
  const newProduct = await productService.createNewProduct(body);
  // envio el nuevo producto como respuesta
  res.send(newProduct);
};

const updateProduct = async (req, res) => {
  // desestructuro el req para quedarme con el body
  const { body } = req;
  // actualizo el producto, enviando el body y el id de params
  const updatedProduct = await productService.updateProduct(req.params.id, body);
  res.send(updatedProduct);
};

const deleteProduct = async (req, res) => {
  // eliminio el producto con el id especificado en params
  await productService.deleteProduct(req.params.id);
  res.send(`Elimino el producto id ${req.params.id}, solo para admins`);
};

export { getAllProducts, getProductById, createNewProduct, updateProduct, deleteProduct };
