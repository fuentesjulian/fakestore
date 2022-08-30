import { cartApi } from "./cartApi.js";

const getData = async () => {
  const data = await cartApi.getIds();
  console.log(data);
};

/* corro la funcion de actualizarHTML cuando carga el DOM */
document.addEventListener("DOMContentLoaded", getData());
