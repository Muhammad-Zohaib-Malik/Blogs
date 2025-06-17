import { v2 as cloudinary } from "cloudinary";
import { cloudinaryConfig } from "../config/cloudinary.js";

export const uploadImage = async (imagePath) => {
  try {
    cloudinaryConfig();
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: "blog app",
    });
    console.log(result);
    return {
      secure_url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    console.log(error);
  }
};
