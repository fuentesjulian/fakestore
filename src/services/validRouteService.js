// creo el error para las rutas no implementadas
const createError = (route, method, errorCode) => {
  const error = {
    error: errorCode
  };
  if (route && method) {
    error.description = `ruta '${route}' metodo '${method}' no implementada`;
  } else {
    error.description = "ruta no implementada";
  }
  return error;
};

// creo la funcion que voy a exportar para rutas no implementadas
const validRouteService = (req, res) => {
  const errorCode = -2;
  res.json(createError(req.url, req.method, errorCode));
};

export { validRouteService };
