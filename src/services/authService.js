// por default pongo en true este booleano para que deje agregar, eliminar y actualizar productos
const isAdmin = true;

// crea el msj de error
const createError = (route, method, errorCode) => {
  const error = {
    error: errorCode
  };
  if (route && method) {
    error.description = `ruta '${route}' metodo '${method}' no autorizado`;
  } else {
    error.description = "no autorizado";
  }
  return error;
};

// funcion que actua como middleware para los metodos POST, PUT y DELETE dentro del router de productos
export const authService = (req, res, next) => {
  const errorCode = -1;
  if (!isAdmin) {
    res.json(createError(req.url, req.method, errorCode));
  } else {
    next();
  }
};