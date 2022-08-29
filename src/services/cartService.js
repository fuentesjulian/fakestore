// servicio de productos que corre las funciones epecificas a cada producto
// traigo un FileContainer para interactuar con productDB.json
const CartContainer = require("../database/FileContainer");
const cartContainer = new CartContainer("src/database/cartDB.json");

const createNewCart = async () => {
  const emptyCart = { productos: [] };
  const newCart = await cartContainer.createNewItem();
  return newCart;
};
const deleteCart = async (cartId) => {
  await cartContainer.deleteItem(cartId);
};
const getCart = async (cartId) => {
  const cart = await cartContainer.getItemById(cartId);
  return { products: cart.products } ?? { products: [] };
};
const addProduct = async (cartId, body) => {
  const product = body.product;
  const { id, timestamp, name, description, code, thumbnail, price, quantity } = product;
  if (id && timestamp && name && description && code && thumbnail && price && quantity) {
    const cart = await cartContainer.getItemById(cartId);
    console.log(cart);
    const newProd = { id, timestamp, name, description, code, thumbnail, price, quantity };
    if (cart.products) {
      let products = cart.products.filter((prod) => prod.id != id);
      products.push(newProd);
      cart.products = products;
    } else {
      cart.products = [];
      cart.products.push(newProd);
    }
    await cartContainer.updateItem(cartId, cart);
    return cart;
  }
};
const deleteProduct = async (cartId, prodId) => {
  const cart = await cartContainer.getItemById(cartId);
  let products = cart.products.filter((prod) => prod.id != prodId);
  cart.products = products;
  await cartContainer.updateItem(cartId, cart);
  return cart;
};

module.exports = { createNewCart, deleteCart, getCart, addProduct, deleteProduct };
