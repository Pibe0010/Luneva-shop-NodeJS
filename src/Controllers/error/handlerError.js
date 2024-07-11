export const handlerErorr = (err, req, res, next) => {
  if (err.statusCode) {
    // Si el error tiene una propiedad statusCode, se trata de un error específico
    const errorResponse = {
      statusCode: err.statusCode,
      code: err.code || "UNKNOWN_ERROR",
      message: err.message || "Unknown error occurred",
    };
    res.status(err.statusCode).send(errorResponse);
  } else {
    // Si no, se trata de un error general del servidor
    console.error(err.stack || "Error desconocido");
    res.status(500).send({ error: "Internal Server Error" });
  }
};
