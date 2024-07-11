import { UPLOADS_DIR } from "../../../env.js";
import path from "path";
import sharp from "sharp";
import { createPathIfNotExistsUtil } from "../../Utils/createPathIfNotExistsUtil.js";
import { saveFileError } from "../error/errorService.js";
import { updateImgProductModel } from "../../Models/product/updateimgProductModel.js";

export const updateImgProductService = async (
  ID_product,
  image_one,
  image_two,
  image_tree,
  width
) => {
  try {
    // Ruta donde se guardará el archivo.
    const uploadsDir = path.join(
      process.cwd(),
      UPLOADS_DIR,
      "products",
      ID_product.toString(),
      ""
    );

    // Creamos el directorio si no existe.
    await createPathIfNotExistsUtil(uploadsDir);

    // Crear un objeto Sharp con la imagen recibida.

    const imgSharpTree = sharp(image_tree.data);

    // Redimensionar la imagen.
    imgSharpTree.resize(width);

    // Nombre de la imagen como uuid.
    const imgNameThree = `${crypto.randomUUID()}.jpg`;

    //  Ruta de la imagen.
    const imgPathThree = path.join(uploadsDir, imgNameThree);

    const imgSharpTwo = sharp(image_two.data);

    imgSharpTwo.resize(width);

    // Nombre de la imagen como uuid.
    const imgNameTwo = `${crypto.randomUUID()}.jpg`;

    //  Ruta de la imagen.
    const imgPathTwo = path.join(uploadsDir, imgNameTwo);

    const imgSharpOne = sharp(image_one.data);

    imgSharpOne.resize(width);

    // Nombre de la imagen como uuid.
    const imgNameOne = `${crypto.randomUUID()}.jpg`;

    //  Ruta de la imagen.
    const imgPathOne = path.join(uploadsDir, imgNameOne);

    // Actualizamos la fotos del producto.
    await updateImgProductModel(
      ID_product,
      imgNameOne,
      imgNameTwo,
      imgNameThree
    );

    // Guardar la imagen.
    try {
      await imgSharpTree.toFile(imgPathOne);
      await imgSharpTwo.toFile(imgPathTwo);
      await imgSharpOne.toFile(imgPathThree);
    } catch (error) {
      saveFileError();
    }

    // Devolver el nombre de la imagen.
    return {
      image_one: imgNameOne,
      image_two: imgNameTwo,
      image_three: imgNameThree,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
