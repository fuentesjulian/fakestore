const isAdmin = false;

const createError = (route, method) => {
  const error = {
    error: -1,
  };
  if (route && method) {
    error.description = `ruta '${route}' metodo '${method}' no autorizado`;
  } else {
    error.description = "no autorizado";
  }
  return error;
};

const authService = (req, res, next) => {
  if (!isAdmin) {
    res.json(createError(req.baseUrl, req.method));
  } else {
    next();
  }
};

module.exports = authService;
