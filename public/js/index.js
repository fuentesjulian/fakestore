import { productsApi } from "./productsApi.js";
import { cartApi } from "./cartApi.js";

const prods = document.getElementById("prods");
const cartCount = document.getElementById("cartCount");

let cartId;
let productData = [];
let cartData = [];

const getData = async () => {
  if (localStorage.getItem("cartId") != null) {
    cartId = localStorage.getItem("cartId");
    cartData = await cartApi.getProds(cartId);
  } else {
    cartData = await cartApi.createCart();
    cartId = cartData.id;
    localStorage.setItem("cartId", cartId);
  }

  productData = await productsApi.get();
  loadProducts(productData);
  updateCartCount(cartData);
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

/* esta función sirve para cargar los productos al HTML */
function loadProducts(productos) {
  const prods = document.getElementById("prods");
  /* volvi a la version anterior de carga, es mas corto el codigo */
  prods.innerHTML = "";
  /* #OPTIMIZACION desestructuracion de parametros */
  productos.forEach(({ name, code, thumbnail, price, stock, description, id }) => {
    /* agrego cada producto al articulo dentro del body en el html */
    const plantilla = document.createElement("div");
    plantilla.className = "card";
    plantilla.innerHTML = `
      <h5 class="titulo">${name} - ${code}</h5>
      <div class="imagen"><img src="${thumbnail}" class="card-img-top" alt="..."></div>
      <div class="card-body">
        <p class="precio">$ ${price.toLocaleString()}</p>
        <p class="card-text descripcion">${description}</p>
        <p class="card-text">ID: ${id}</p>
        <p class="card-text" id="stock-${id}">Stock: ${stock}</p>
        <button class="btn btn-dark" id="add-${id}">Agregar</button>
      </div>`;
    prods.appendChild(plantilla);
    /* cuando hago click corro la instrucion agregarProducto */
    const addBtn = document.getElementById(`add-${id}`);
    if (stock === 0) {
      addBtn.disabled = true;
    }
    addBtn.onclick = () => {
      addProd(id, cartId);
    };
  });
}

const addProd = async (prodId, cartId) => {
  let product = productData.find((prod) => prod.id === prodId);
  console.log(product);

  if (cartData.products?.length > 0) {
    if (cartData.products.some((prod) => prod.id === product.id)) {
      const quantity = cartData.products.find((prod) => prod.id === product.id).quantity + 1;
      product = { ...product, quantity: quantity };
    } else {
      product = { ...product, quantity: 1 };
    }
  } else {
    product = { ...product, quantity: 1 };
  }
  console.log(product);
  await cartApi.postProd(cartId, product);
  cartData = await cartApi.getProds(cartId);
  console.log(cartData);
  updateCartCount(cartData);
  Toastify({
    text: `${product.name} agregado a carrito`,
    duration: 1000,
    style: {
      background: "linear-gradient(to right, #666666, #666666)"
    }
  }).showToast();
};

const updateCartCount = (cart) => {
  let quantity = 0;
  cart.products.forEach((product) => {
    quantity += product.quantity;
  });

  cartCount.innerHTML = `<i class="bi bi-cart"></i> ${quantity}`;
};

/* corro la funcion de actualizarHTML cuando carga el DOM */
document.addEventListener("DOMContentLoaded", getData());
