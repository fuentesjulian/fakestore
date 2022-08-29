// controlador del cart, corre las funciones necesarias para cada response del router de carrito
// traigo el servicios de carrito que corre las funciones de carrito
const cartService = require("../services/cartService");

const createNewCart = async (req, res) => {
  // creo un cart nuevo y traigo el id
  const newCart = await cartService.createNewCart();
  res.send(newCart);
};

const deleteCart = async (req, res) => {
  // eliminio el carrito con el id especificado en params
  await cartService.deleteCart(req.params.id);
  res.send(`Borro el carrito id ${req.params.id}`);
};

const getCartProducts = async (req, res) => {
  const cart = await cartService.getCart(req.params.id);
  res.send(cart.products);
};

const addProduct = async (req, res) => {
  const { body } = req;
  const cart = await cartService.addProduct(req.params.id, body);
  res.send(cart);
};

const deleteProduct = async (req, res) => {
  const cart = await cartService.deleteProduct(req.params.id,req.params.id_prod)
  res.send(cart);
};

module.exports = { createNewCart, deleteCart, getCartProducts, addProduct, deleteProduct };
