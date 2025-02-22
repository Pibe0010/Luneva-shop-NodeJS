import joi from "joi";
import { imgSchema } from "../error/imgSchema.js";

export const updateProductImgSchema = joi.object({
  image_one: imgSchema.optional(),
  image_two: imgSchema.optional(),
  image_three: imgSchema.optional(),
});
