import { UPLOADS_DIR } from "../../../env.js";
import path from "path";
import sharp from "sharp";
import { createPathIfNotExistsUtil } from "../../Utils/createPathIfNotExistsUtil.js";
/* import { saveFileError } from "../error/errorService.js"; */
import { updateImgProductModel } from "../../Models/product/updateimgProductModel.js";
import { handleErrorService } from "../../Utils/handleError.js";
import { selectProductByIdModel } from "../../Models/product/selectProductByIdModel.js";

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

    // Variable para almacenar el nombre de la imagen actualizada
    let updatedImgName = null;

    // Actualizamos imagen uno si existe.
    if (image_one) {
      const imgSharpOne = sharp(image_one.data);
      imgSharpOne.resize(width);

      const imgNameOne = `${crypto.randomUUID()}.jpg`;
      const imgPathOne = path.join(uploadsDir, imgNameOne);

      await imgSharpOne.toFile(imgPathOne);
      updatedImgName = await selectProductByIdModel(ID_product);

      // Actualizamos el modelo con la nueva imagen.
      await updateImgProductModel(ID_product, imgNameOne, null, null);
    }

    // Actualizamos imagen dos si existe.
    if (image_two) {
      const imgSharpTwo = sharp(image_two.data);
      imgSharpTwo.resize(width);

      const imgNameTwo = `${crypto.randomUUID()}.jpg`;
      const imgPathTwo = path.join(uploadsDir, imgNameTwo);

      await imgSharpTwo.toFile(imgPathTwo);
      updatedImgName = await selectProductByIdModel(ID_product);

      // Actualizamos el modelo con la nueva imagen.
      await updateImgProductModel(ID_product, null, imgNameTwo, null);
    }

    // Actualizamos imagen tres si existe.
    if (image_tree) {
      const imgSharpTree = sharp(image_tree.data);
      imgSharpTree.resize(width);

      const imgNameThree = `${crypto.randomUUID()}.jpg`;
      const imgPathThree = path.join(uploadsDir, imgNameThree);

      await imgSharpTree.toFile(imgPathThree);
      updatedImgName = await selectProductByIdModel(ID_product);

      // Actualizamos el modelo con la nueva imagen.
      await updateImgProductModel(ID_product, null, null, imgNameThree);
    }

    // Devolver el nombre de la imagen que se haya actualizado.
    return updatedImgName;
  } catch (error) {
    handleErrorService(
      error,
      "UPDATE_PRODUCT_SERVICE_ERROR",
      "Error al actualizar la foto del producto desde el servicio"
    );
  }
};
