import fs from "fs/promises";
import path from "path";
import { UPLOADS_DIR } from "../../env.js";

export const createUploadsPathUtil = async () => {
  const rootDir = process.cwd();
  const uploadsDir = path.join(rootDir, `${UPLOADS_DIR}`);
  const userDir = path.join(uploadsDir, "user");
  const productDir = path.join(uploadsDir, "products");

  try {
    await fs.mkdir(uploadsDir, { recursive: true });
    console.log("Creating uploads directory");

    await fs.mkdir(userDir, { recursive: true });
    console.log("Creating users directory");

    await fs.mkdir(productDir, { recursive: true });
    console.log("Creating products directory");

    console.log("Creating uploads directory structure created successfully.");
  } catch (error) {
    error.code = "CREATE_UPLOADS_STRUCTURE_PATH_ERROR";
    error.message = "Error creating uploads directory structure";
    throw error;
  }
};
