// controlador del cart, corre las funciones necesarias para cada response del router de carrito
// traigo el servicios de carrito que corre las funciones de carrito
import * as cartService from "../services/cartService.js";

const getAllCarts = async (req, res) => {
  const allCarts = await cartService.getAllCarts();
  res.send(allCarts);
};

const createNewCart = async (req, res) => {
  // creo un cart nuevo y traigo el id
  
  // const newCart = await cartService.createNewCart({
  //   uid: req.user.id,
  //   status: "open",
  // });
  const cart = await cartService.handleCart({
    uid: req.user.id,
    status: "open",
  });

  res.send(cart);
};

const deleteCart = async (req, res) => {
  // eliminio el carrito con el id especificado en params
  await cartService.deleteCart(req.params.id);
  res.send(`Borro el carrito id ${req.params.id}`);
};

const getCart = async (req, res) => {
  // obtengo los productos del carrito con el id especificado en params
  const cart = await cartService.getCart(req.params.id);
  res.send(cart);
};

const addProduct = async (req, res) => {
  // agrego un producto al carrito con el id especificado en params
  const { body } = req;
  const cart = await cartService.addProduct(req.params.id, body);
  res.send(cart);
};

const deleteProduct = async (req, res) => {
  // elimino un producto
  const cart = await cartService.deleteProduct(
    req.params.id,
    req.params.id_prod
  );
  res.send(cart);
};

export {
  getAllCarts,
  createNewCart,
  deleteCart,
  getCart,
  addProduct,
  deleteProduct,
};
