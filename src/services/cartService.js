// servicio de productos que corre las funciones epecificas a cada producto
// traigo un FileContainer para interactuar con productDB.json
const CartContainer = require("../database/FileContainer");
const cartContainer = new CartContainer("src/database/cartDB.json");

// obtengo todos los carritos
const getAllCarts = async () => {
  const allCarts = await cartContainer.getAllItems();
  return allCarts;
};

// creo un carrito
const createNewCart = async () => {
  const newCart = await cartContainer.createNewItem();
  return newCart;
};

// borro un carrito
const deleteCart = async (cartId) => {
  await cartContainer.deleteItem(cartId);
};

// obtengo el carrito y devuevo los productos
const getCart = async (cartId) => {
  const cart = await cartContainer.getItemById(cartId);
  return { products: cart.products } ?? { products: [] };
};

// agrego un producto
const addProduct = async (cartId, body) => {
  const product = body.product;
  // checkeo que el producto tenga todas las variables necesarias
  const { id, timestamp, name, description, code, thumbnail, price, quantity } = product;
  if (id && timestamp && name && description && code && thumbnail && price && quantity) {
    // busco el carrito al que debo agregar el producto
    const cart = await cartContainer.getItemById(cartId);
    // creo un nuevo producto para agregar
    const newProd = { id, timestamp, name, description, code, thumbnail, price: parseFloat(price), quantity };
    
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
    await cartContainer.updateItem(cartId, cart);
    // devuelvo la cart nueva
    return cart;
  }
};

// borro un producto de la cart
const deleteProduct = async (cartId, prodId) => {
  // busco la cart
  const cart = await cartContainer.getItemById(cartId);
  // filtro para eliminar el producto con el id prodId
  const products = cart.products.filter((prod) => prod.id != prodId);
  cart.products = products;
  // actualizo la base de datos y devuelvo la cart
  await cartContainer.updateItem(cartId, cart);
  return cart;
};

module.exports = { getAllCarts, createNewCart, deleteCart, getCart, addProduct, deleteProduct };
