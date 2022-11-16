export const productsApi = {
    get: () => {
      return fetch("/api/productos").then((data) => data.json());
    },
    post: (newProd) => {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newProd)
      };
      return fetch("/api/productos", options);
    },
    put: (idProd, newProd) => {
      const options = {
        method: "PUT",
        body: JSON.stringify(newProd),
        headers: {
          "Content-Type": "application/json"
        }
      };
      return fetch(`/api/productos/${idProd}`, options);
    },
    delete: (idProd) => {
      const options = {
        method: "DELETE"
      };
      return fetch(`/api/productos/${idProd}`, options);
    },
    getById: (idProd) => {
      return fetch(`/api/productos/${idProd}`).then((data) => data.json());
    }
  };