// servicio de productos que corre las funciones epecificas a cada producto
// traigo un FileContainer para interactuar con productDB.json
// import { FileContainer } from "../database/FileContainer.js";
// const cartContainer = new FileContainer("src/database/cartDB.json");

import { carritosDao as cartContainer } from "../daos/index.js";

// obtengo todos los carritos
const getAllCarts = async () => {
  const allCarts = await cartContainer.getAll();
  return allCarts;
};

// creo un carrito
const createNewCart = async (data) => {
  const newCart = await cartContainer.createNew(data);
  return newCart;
};

// borro un carrito
const deleteCart = async (cartId) => {
  await cartContainer.deleteById(cartId);
};

// obtengo el carrito y devuevo los productos
const getCart = async (cartId) => {
  const cart = await cartContainer.getById(cartId);
  return { products: cart?.products } ?? { products: [] };
};

const handleCart = async (data) => {
  const cart = await cartContainer.getByObjCriteria(data);
  if (!cart) {
    const newCart = await createNewCart(data);
    return newCart;
  }
  return cart;
};

// agrego un producto
const addProduct = async (cartId, body) => {
  const product = body.product;

  // checkeo que el producto tenga todas las variables necesarias
  const { id, timestamp, name, description, code, thumbnail, price, quantity } =
    product;

  // busco el carrito al que debo agregar el producto

  const cart = await cartContainer.getById(cartId);
  // creo un nuevo producto para agregar
  const newProd = {
    id,
    timestamp,
    name,
    description,
    code,
    thumbnail,
    price: parseFloat(price),
    quantity,
  };

  // si la cart tiene productos tengo que revisar si ya tengo ese producto en la cart para actualizar
  if (cart.products) {
    // filtro y agrego el nuevo prod
    let products = cart.products.filter((prod) => prod.id != id);
    products.push(newProd);
    cart.products = products;
  } else {
    cart.products = [];
    cart.products.push(newProd);
  }

  // actualizo la base de datos
  await cartContainer.updateById(cartId, cart);
  // devuelvo la cart nueva
  return cart;
};

// borro un producto de la cart
const deleteProduct = async (cartId, prodId) => {
  // busco la cart
  const cart = await cartContainer.getById(cartId);
  // filtro para eliminar el producto con el id prodId
  const products = cart.products.filter((prod) => prod.id != prodId);
  cart.products = products;
  // actualizo la base de datos y devuelvo la cart
  await cartContainer.updateById(cartId, cart);
  return cart;
};

const billCart = async (cartId, userId) => {
  const cart = await cartContainer.getById(cartId);
  if (cart.uid === userId) {
    cart.status = "closed";
    await cartContainer.updateById(cartId, cart);
  }
  return cart;
};

export {
  getAllCarts,
  createNewCart,
  deleteCart,
  getCart,
  addProduct,
  deleteProduct,
  handleCart,
  billCart,
};
