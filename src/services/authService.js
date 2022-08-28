const isAdmin = false;

const createError = (route, method, errorCode) => {
  const error = {
    error: errorCode,
  };
  if (route && method) {
    error.description = `ruta '${route}' metodo '${method}' no autorizado`;
  } else {
    error.description = "no autorizado";
  }
  return error;
};

const authService = (req, res, next) => {
  const errorCode = -1;
  if (!isAdmin) {
    res.json(createError(req.url, req.method, errorCode));
  } else {
    next();
  }
};

module.exports = authService;
