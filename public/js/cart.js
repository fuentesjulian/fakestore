import { cartApi } from "./cartApi.js";

let cartData = [];

const createCartView = async () => {
  cartData = await cartApi.createCart();
  updateCartCount(cartData);
  const cartHtml = document.getElementById("cart");
  

  let htmlOutput = `<h2>Carrito: </h2>`
  cartData.products.forEach(prod=>{
      htmlOutput += `<p>${prod.code} ${prod.name} --> $ ${prod.price} x ${prod.quantity} unidades</p>`
  })
  cartHtml.innerHTML = htmlOutput;
  const checkoutBtn = document.getElementById("checkout");
  checkoutBtn.onclick = () => {
    checkout(cartData.id);
  };
};

const checkout = async (cartId) => {
  const options = { method: "POST" };
  return fetch(`/checkout/${cartId}`, options).then((data) => {

   location.href = `/checkout/${cartId}`;
  });
};

const updateCartCount = (cart) => {
  let quantity = 0;
  if (cart.products?.length > 0)
    cart.products.forEach((product) => {
      quantity += product.quantity;
    });

  cartCount.innerHTML = `<i class="bi bi-cart"></i> ${quantity}`;
};
/* corro la funcion de actualizarHTML cuando carga el DOM */
document.addEventListener("DOMContentLoaded", createCartView());
