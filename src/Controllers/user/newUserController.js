import { validateSchemaUtil } from "../../Utils/validateSchemaUtil.js";
import { newUserSchema } from "../../Schemas/user/newUserSchema.js";
import { insertUserService } from "../../Services/user/insertUserService.js";
import { handleErrorController } from "../../Utils/handleError.js";

export const newUserController = async (req, res, next) => {
  try {
    // Validamos el body
    await validateSchemaUtil(newUserSchema, req.body);

    // Insertamos el usuario en la base de datos
    const response = await insertUserService(req.body);

    res.status(201).send({
      status: "ok",
      message: "Usuario creado correctamente",
      data: { response },
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "NEW_USER_CONTROLLER_ERROR",
      "Error en el controlador de registro de usuario"
    );
  }
};
