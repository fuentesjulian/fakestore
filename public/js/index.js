import { productsApi } from "./productsApi.js";
import { cartApi } from "./cartApi.js";

const prods = document.getElementById("prods");
const cartCount = document.getElementById("cartCount");

cartCount.onclick = () => {
  location.href = "/cart";
};

let cartId;
let productData = [];
let cartData = [];

const getData = async () => {
  cartData = await cartApi.createCart();
  cartId = cartData.id ?? cartData._id;
  cartData.products?.forEach((prod) => {
    if (!prod.id) prod.id = prod._id;
  });

  productData = await productsApi.get();

  productData.forEach((prod) => {
    if (!prod.id) prod.id = prod._id;
  });
  loadProducts(productData);
  updateCartCount(cartData);
  createCartModal(cartData);
};

/* esta función sirve para cargar los productos al HTML */
function loadProducts(products) {
  const prods = document.getElementById("prods");
  /* volvi a la version anterior de carga, es mas corto el codigo */
  prods.innerHTML = "";
  /* #OPTIMIZACION desestructuracion de parametros */
  products.forEach(
    ({ name, code, thumbnail, price, stock, description, id }) => {
      /* agrego cada producto al articulo dentro del body en el html */
      const plantilla = document.createElement("div");
      let enabled = "";
      if (stock === 0) {
        enabled = "card-disabled";
      } else {
        enabled = "card-enabled";
      }
      plantilla.id = `card-${id}`;
      plantilla.className = `card ${enabled}`;
      plantilla.innerHTML = `
      <h5 class="titulo">${name} - ${code}</h5>
      <div class="imagen"><img src="${thumbnail}" class="card-img-top" alt="..."></div>
      <div class="card-body">
        <p class="precio">$ ${price.toLocaleString()}</p>
        <p class="card-text descripcion">${description}</p>
        <p class="card-text">ID: ${id}</p>
        <p class="card-text" id="stock-${id}">Stock: ${stock}</p>
      </div>`;
      prods.appendChild(plantilla);
      const cardBtn = document.getElementById(`card-${id}`);
      if (stock > 0) {
        cardBtn.onclick = () => {
          location.href = `/item/${id}`;
        };
      }
    }
  );
}

const addProd = async (prodId, cartId) => {
  let product = productData.find((prod) => prod.id === prodId);
  if (cartData.products?.length > 0) {
    if (cartData.products.some((prod) => prod.id === product.id)) {
      const quantity =
        cartData.products.find((prod) => prod.id === product.id).quantity + 1;
      product = { ...product, quantity: quantity };
    } else {
      product = { ...product, quantity: 1 };
    }
  } else {
    product = { ...product, quantity: 1 };
  }

  await cartApi.postProd(cartId, product);
  cartData = await cartApi.getProds(cartId);
  updateCartCount(cartData);
  Toastify({
    text: `${product.name} agregado a carrito`,
    duration: 1000,
    style: {
      background: "linear-gradient(to right, #666666, #666666)",
    },
  }).showToast();
  createCartModal(cartData);
};

const updateCartCount = (cart) => {
  let quantity = 0;
  if (cart.products?.length > 0)
    cart.products.forEach((product) => {
      quantity += product.quantity;
    });

  cartCount.innerHTML = `<i class="bi bi-cart"></i> ${quantity}`;
};

function createCartModal(cart) {
  const itemsCarrito = document.getElementById("itemsCarrito");
  /* limpio el html */
  itemsCarrito.innerHTML = "";
  /* primero checkeo si el carrito esta vacio */
  if (cart.products?.length > 0) {
    /* #OPTIMIZACION con destructuracion */

    cart.products.forEach(({ id, quantity, thumbnail, name, price }) => {
      const itemCarrito = document.createElement("li");
      itemCarrito.className = "list-group-item";
      /* uso el input numerico con un max que sea igual al stock */
      itemCarrito.innerHTML = `<div class="imagen"><img src="img/${thumbnail}" alt="" /></div>
        <div class="texto">
          <div class="nombre">${name}</div>
          <div class="stock">#SKU ${id}</div>
          <div class="precio-unit">Precio unitario $ ${price.toLocaleString()}</div>
        </div>
        <div class="cantidad">${quantity} un pedidas</div>
        <div class="eliminar" id="eliminar-${id}"><i class="bi bi-trash"></i></div>`;
      itemsCarrito.appendChild(itemCarrito);
      const btnEliminarItem = document.getElementById(`eliminar-${id}`);
      btnEliminarItem.onclick = () => {
        deleteProd(cartId, id);
      };
    });
  } else {
    itemsCarrito.innerHTML = "Carrito vacio";
  }
}

const deleteProd = async (cartId, prodId) => {
  await cartApi.deleteProd(cartId, prodId);
  cartData = await cartApi.getProds(cartId);
  updateCartCount(cartData);
  createCartModal(cartData);
};

/* corro la funcion de actualizarHTML cuando carga el DOM */
document.addEventListener("DOMContentLoaded", getData());
