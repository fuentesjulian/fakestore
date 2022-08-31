import { productsApi } from "./productsApi.js";
import { cartApi } from "./cartApi.js";

const prods = document.getElementById("prods");

const getData = async () => {
  const data = await productsApi.get();
  let prodsHtml = "";
  data.forEach((product) => {
    prodsHtml += createCard(product);
  });
  prods.innerHTML = prodsHtml;
};

const createCard = (product) => {
  const { name, code, thumbnail, price, stock, description, id } = product;
  const html = `<div class="card" style="width: 18rem;" id=prod-${id}>
  <img src="${thumbnail}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${name}</h5>
    <p class="card-code">Codigo: ${code}</p>
    <p class="card-price">Precio: ${price}</p>
    <p class="card-stock">Stock: ${stock}</p>
    <p class="card-text">${description}</p>
  </div>
  </div>`;
  return html;
};

/* corro la funcion de actualizarHTML cuando carga el DOM */
document.addEventListener("DOMContentLoaded", getData());
