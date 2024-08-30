import {
  controllerError,
  internalServerError,
} from "../Services/error/errorServer.js";

// Funcion para manejar errores en el controlador
export const handleErrorController = (
  error,
  next,
  defaultCode,
  defaultMessage,
  defaultStatusCode = 500
) => {
  if (error.code && error.statusCode) {
    next(error);
  } else {
    next(controllerError(defaultCode, defaultMessage, defaultStatusCode));
  }
};

export const handleErrorService = (error, defaultCode, defaultMessage) => {
  if (error.statusCode) {
    throw error;
  } else {
    internalServerError({
      code: defaultCode,
      message: defaultMessage,
    });
  }
};
