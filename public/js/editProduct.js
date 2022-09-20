import { productsApi } from "./productsApi.js";

let data = [];
const idSelect = document.getElementById("idSelect");
const editProdForm = document.getElementById("editProdForm");
const updateBtn = document.getElementById("updateBtn");
const deleteBtn = document.getElementById("deleteBtn");
const prodOutput = document.getElementById("prodOutput");

const getData = async () => {
  data = await productsApi.get();
  let html = "<option value='-1'>Choose...</option>";
  data.forEach((product) => {
    if(!product.id) product.id = product._id;
    html += `<option value="${product.id}">${product.id}</option>`;
  });
  editProdForm.reset();
  idSelect.innerHTML = html;
};

/* corro la funcion de actualizarHTML cuando carga el DOM */
document.addEventListener("DOMContentLoaded", getData());

idSelect.addEventListener("change", () => {
  if (idSelect.value !=-1) {
    const product = data.find((product) => String(product.id) === idSelect.value);
    console.log(idSelect.value)
    console.log(data)
    editProdForm[1].value = product.name;
    editProdForm[2].value = product.code;
    editProdForm[3].value = product.thumbnail;
    editProdForm[4].value = product.price;
    editProdForm[5].value = product.stock;
    editProdForm[6].value = product.description;
    prodOutput.innerHTML = createCard(product);
    updateBtn.disabled = false;
    deleteBtn.disabled = false;
  } else {
    editProdForm.reset();
    updateBtn.disabled = true;
    deleteBtn.disabled = true;
  }
});

editProdForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

updateBtn.onclick = async () => {
  const product = {
    name: editProdForm[1].value,
    code: editProdForm[2].value,
    thumbnail: editProdForm[3].value,
    price: editProdForm[4].value,
    stock: editProdForm[5].value,
    description: editProdForm[6].value
  };
  await productsApi.put(editProdForm[0].value, product);
  await getData();
  prodOutput.innerHTML = '<div style="text-align: center;">Aqui veras el producto seleccionado</div>';
  return false;
};

deleteBtn.onclick = async () => {
  await productsApi.delete(editProdForm[0].value);
  await getData();
  prodOutput.innerHTML = '<div style="text-align: center;">Aqui veras el producto seleccionado</div>';
  return false;
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
