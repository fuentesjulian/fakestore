const createError = (route, method, errorCode) => {
  const error = {
    error: errorCode,
  };
  if (route && method) {
    error.description = `ruta '${route}' metodo '${method}' no implementada`;
  } else {
    error.description = "ruta no implementada";
  }
  return error;
};

const validRouteService = (req, res) => {
  const errorCode = -2;
  console.log(req.method)
  res.json(createError(req.url, req.method, errorCode));
};

module.exports = validRouteService;
