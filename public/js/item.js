import { cartApi } from "./cartApi.js";
import { productsApi } from "./productsApi.js";

const cartCount = document.getElementById("cartCount");
cartCount.onclick = () => {
  location.href = "/cart";
};


const initView = async (itemId, stock) => {
  let cart = await cartApi.createCart();
  const product = await productsApi.getById(itemId);
  updateCartCount(cart);

  let cantidad = 0;

  cart.products?.forEach((prod) => {
    if (itemId === prod.id) {
      cantidad = prod.quantity;
    }
  });

  const btnConfirmar = document.getElementById("confirmar");
  const btnEliminar = document.getElementById("eliminar");

  if (cantidad === 0) {
    btnConfirmar.innerText = "Agregar a carrito";
    btnEliminar.disabled = true;
    cantidad = 1;
  } else {
    btnConfirmar.innerText = "Actualizar cantidad";
  }

  const htmlCantidad = document.getElementById("cantidad");
  const btnMenos = document.getElementById("btnMenos");
  const btnMas = document.getElementById("btnMas");
  htmlCantidad.innerText = cantidad;

  btnMas.onclick = () => {
    cantidad++;
    htmlCantidad.innerText = cantidad;
    handleButtons();
  };

  btnMenos.onclick = () => {
    cantidad--;
    htmlCantidad.innerText = cantidad;
    handleButtons();
  };

  btnConfirmar.onclick = async () => {
    const prod = { ...product, quantity: cantidad };
    await cartApi.postProd(cart.id, prod);
    cart = await cartApi.createCart();
    btnEliminar.disabled = false;
    btnConfirmar.innerText="Actualizar cantidad"
    updateCartCount(cart);
  };

  btnEliminar.onclick = async () => {
    await cartApi.deleteProd(cart.id, product.id);
    cart = await cartApi.createCart();
    btnEliminar.disabled = true;
    btnConfirmar.innerText="Agregar a carrito"
    updateCartCount(cart);
  };

  const handleButtons = () => {
    if (cantidad === 1) {
      btnMenos.disabled = true;
    } else {
      btnMenos.disabled = false;
    }

    if (cantidad === stock) {
      btnMas.disabled = true;
    } else {
      btnMas.disabled = false;
    }
  };

  handleButtons();
};

/* corro la funcion de actualizarHTML cuando carga el DOM */
document.addEventListener("DOMContentLoaded", () => {
  const itemId = document.getElementById("itemId").innerText;
  const itemStock = parseInt(document.getElementById("itemStock").innerText);
  initView(itemId, itemStock);
});

const updateCartCount = (cart) => {
  let quantity = 0;
  if (cart.products?.length > 0)
    cart.products.forEach((product) => {
      quantity += product.quantity;
    });

  cartCount.innerHTML = `<i class="bi bi-cart"></i> ${quantity}`;
};
