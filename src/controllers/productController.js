const getAllProducts = (req, res) => {
  res.send(`Obtengo todos los productos`);
};
const getProductById = (req, res) => {
  res.send(`Obtengo el producto id ${req.params.id}`);
};
const createNewProduct = (req, res) => {
  res.send(`Agrego un producto, solo para admins`);
};
const updateProduct = (req, res) => {
  res.send(`Modifico el producto id ${req.params.id}, solo para admins`);
};
const deleteProduct = (req, res) => {
  res.send(`Elimino el producto id ${req.params.id}, solo para admins`);
};

module.exports = { getAllProducts, getProductById, createNewProduct, updateProduct, deleteProduct };
