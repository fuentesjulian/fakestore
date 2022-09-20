import { productsApi } from "./productsApi.js";

const newProdForm = document.getElementById("newProdForm");
const prodOutput = document.getElementById("prodOutput");

newProdForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const product = {
    name: newProdForm[0].value,
    code: newProdForm[1].value,
    thumbnail: newProdForm[2].value,
    price: newProdForm[3].value,
    stock: newProdForm[4].value,
    description: newProdForm[5].value
  };
  productsApi
    .post(product)
    .then((response) => response.json())
    .then((data) => (prodOutput.innerHTML = createCard(data)))
    .then(newProdForm.reset());
});

const createCard = (product) => {
  console.log(product)
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
