import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT || 9000,
  mongodbUrl: process.env.MONGODB_URL || "",
  jwtSecret: process.env.JWT_SECRET_KEY || "",
  Cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
    apiKey: process.env.CLOUDINARY_API_KEY || "",
    apiSecret: process.env.CLOUDINARY_API_SECRET || "",
  },
  resendApiKey: process.env.RESEND_API_KEY || "",
  appUrl: process.env.APP_URL || "",
  geminiApiKey: process.env.GEMINI_API_KEY || "",
};

export default config;
