import { UPLOADS_DIR } from "../../../env.js";
import path from "path";
import sharp from "sharp";
import { createPathIfNotExistsUtil } from "../../Utils/createPathIfNotExistsUtil.js";
import { updateUserAvatarModel } from "../../Models/user/updateUserAvatarModel.js";
import { saveFileError } from "../error/errorService.js";

export const updateAvatarUserService = async (ID_user, img, width) => {
  try {
    // Ruta donde se guardará el archivo.
    const uploadsDir = path.join(
      process.cwd(),
      UPLOADS_DIR,
      "users",
      ID_user.toString(),
      ""
    );

    // Creamos el directorio si no existe.
    await createPathIfNotExistsUtil(uploadsDir);

    // Crear un objeto Sharp con la imagen recibida.
    const imgSharp = sharp(img.data);

    // Redimensionar la imagen.
    imgSharp.resize(width);

    // Nombrede la imagen como uuid.
    const imgName = `${crypto.randomUUID()}.jpg`;

    // Actualizamos el avatar del usuario.
    await updateUserAvatarModel(ID_user, imgName);

    //  Ruta de la imagen.
    const imgPath = path.join(uploadsDir, imgName);

    // Guardar la imagen.
    try {
      await imgSharp.toFile(imgPath);
    } catch (error) {
      saveFileError();
    }

    // Devolver el nombre de la imagen.
    return imgName;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
