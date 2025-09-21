import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // file has been uploaded succesfull
    console.log("file has been uploaded succesfull ", response);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the llocaally saved temprory file as the upload
    return null;
  }
};
// cloudinary.v2.uploader.upload(file, options).then(callback);

export { uploadOnCloudinary };
