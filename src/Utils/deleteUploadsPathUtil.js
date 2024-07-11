import fs from "fs/promises";
import path from "path";
import { UPLOADS_DIR } from "../../env.js";

export const deleteUploadsPathUtil = async () => {
  const uploadsDir = path.join(process.cwd(), `${UPLOADS_DIR}`);

  try {
    // Comprobamos si el directorio existe y borramos el directorio
    await fs.access(uploadsDir);

    await fs.delete(uploadsDir, { recursive: true });
    console.log(
      "Uploads directory and its contents have been deleted successfully."
    );
  } catch (error) {
    error.code = "DELETE_UPLOADS_PATH_ERROR";
    error.message = "Error deleting uploads failed";
    throw error;
  }
};
