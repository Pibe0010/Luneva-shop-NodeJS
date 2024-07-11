import { updateUserSchema } from "../../Schemas/user/updateUserSchema.js";
import { updateAvatarUserService } from "../../Services/user/updateAvatarUserService.js";
import { updateUserService } from "../../Services/user/updateUserService.js";
import { validateSchemaUtil } from "../../Utils/validateSchemaUtil.js";

export const updateUserController = async (req, res, next) => {
  try {
    // Validamos el body
    await validateSchemaUtil(updateUserSchema, req.body);
    await validateSchemaUtil(updateUserSchema, req.files || {});

    // Obtengo el id
    const ID_user = req.user.ID_user;

    let message = "";
    let data = {};

    // Actualizamos el avatar del usuario
    if (req.files !== undefined) {
      const avatarName = await updateAvatarUserService(
        ID_user,
        req.files.avatar,
        100
      );
      message += "avatar actualizado ";
      data.avatarName = avatarName;
    }

    const user = await updateUserService(ID_user, req.body);
    message += " Usuario actualizado";
    data.user = user;

    res.status(201).send({ status: "ok", message: message.trim(), data: data });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
