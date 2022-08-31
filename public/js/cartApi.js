export const cartApi = {
  createCart: () => {
    const options = { method: "POST" };
    return fetch("/api/carrito", options).then((data) => data.json());
  },
  getIds: () => {
    return fetch("/api/carrito").then((data) => data.json());
  },
  postProd: (cartId, product) => {
    const data = { product: product };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
    return fetch(`/api/carrito/${cartId}/productos`, options);
  },
  getProds: (cartId) => {
    return fetch(`/api/carrito/${cartId}/productos`).then((data) => data.json());
  },
  deleteProd: (cartId, prodId) => {
    const options = {
      method: "DELETE"
    };
    return fetch(`/api/carrito/${cartId}/productos/${prodId}`, options);
  }
};
