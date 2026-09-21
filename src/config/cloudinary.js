import { v2 as cloudinary } from "cloudinary";
import config from "./config.js";

const connectCloudinary = () => {
  cloudinary.config({
    cloud_name: config.Cloudinary.cloudName,
    api_key: config.Cloudinary.apiKey,
    api_secret: config.Cloudinary.apiSecret,
  });
  console.log("Cloudinary Connection Successful");
};

export default connectCloudinary;
