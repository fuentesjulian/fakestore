const btnMenos = document.getElementById("btnMenos");
const btnMas = document.getElementById("btnMas");
const htmlCantidad = document.getElementById("cantidad");
const htmlStock = document.getElementById("stock");
let cantidad = 1;
let stock = parseInt(htmlStock.innerText);

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

const setItemView = () => {
  stock = parseInt(htmlStock.innerText);
  handleButtons();
};

document.addEventListener("DOMContentLoaded", setItemView());
