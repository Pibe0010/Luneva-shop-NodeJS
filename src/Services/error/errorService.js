export const notFoundError = (resource) => {
  throw {
    httpStatusCode: 404,
    code: "RESOURCE_NOT_FOUND",
    message: `El ${resource} no existe`,
  };
};

export const usernameAlreadyRegisteredError = () => {
  throw {
    httpStatusCode: 409,
    code: "USERNAME_ALREADY_REGISTERED",
    message: "El usuario ya existe",
  };
};

export const emailAlreadyRegisteredError = () => {
  throw {
    httpStatusCode: 409,
    code: "EMAIL_ALREADY_REGISTERED",
    message: "El email ya existe",
  };
};

export const userAlreadyActivatedError = () => {
  throw {
    httpStatusCode: 409,
    code: "USER_ALREADY_ACTIVATED",
    message: "El usuario no ha sido activado",
  };
};

export const limitedStockError = (resource) => {
  throw {
    httpStatusCode: 409,
    code: "LIMITED_STOCK",
    message: `No hay ${resource} suficientes en stock disponible`,
  };
};

export const invalidPasswordError = () => {
  throw {
    httpStatusCode: 401,
    code: "INVALID_PASSWORD",
    message: "La contraseña es incorrecta",
  };
};

export const invalidCredentials = (message) => {
  throw {
    statusCode: 401,
    code: "INVALID_CREDENTIALS",
    message: message || "Credenciales inválidas",
  };
};

export const saveFileError = () => {
  throw {
    httpStatus: 500, // Internal Server Error
    code: "FILE_SAVE_FAILED",
    message: "Error al guardar el archivo en el disco",
  };
};

export const invalidStatusError = (message) => {
  throw {
    statusCode: 401,
    code: "INVALID_STATUS",
    message: message || "Error el estado no es cancelado",
  };
};
