// controlador del cart, corre las funciones necesarias para cada response del router de carrito

const createNewCart = (req, res) => {
  res.send(`Creo un carrito y devuelvo su id`);
};

const deleteCart = (req, res) => {
  res.send(`Borro el carrito id ${req.params.id}`);
};

const getCartProducts = (req, res) => {
  res.send(`Obtengo los productos del carrito id ${req.params.id}`);
};

const addCartProduct = (req, res) => {
  res.send(`Agrego un producto al carrito id ${req.params.id}`);
};

const deleteCartProduct = (req, res) => {
  res.send(`Elimino el producto id ${req.params.id_prod} del carrito id ${req.params.id}`);
};

module.exports = { createNewCart, deleteCart, getCartProducts, addCartProduct, deleteCartProduct };
