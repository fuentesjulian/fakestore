import { cartApi } from "./cartApi.js";

const carts = document.getElementById("carts");
const getData = async () => {
  const data = await cartApi.getIds();
  let cartHtml = "";
  data.forEach((cart) => {
    let prodHtml = "";

    if (cart.products?.length > 0) {
      cart.products.forEach((product) => {
        prodHtml += `<p>ID ${product.id} - ${product.name} - ${product.quantity} unidades - $${product.price} por unidad</p>`;
      });
    }
    cartHtml += `<h5>Cart Id ${cart.id}</h5>${prodHtml}`;
  });
  carts.innerHTML = cartHtml;
};

/* corro la funcion de actualizarHTML cuando carga el DOM */
document.addEventListener("DOMContentLoaded", getData());
