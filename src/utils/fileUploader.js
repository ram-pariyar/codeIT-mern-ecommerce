import { v2 as cloudinary } from "cloudinary";

const uploadFiles = async (files) => {
  const uploadedFiles = [];
  for (const file of files) {
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "CodeIT_ECOMMERCE",
            allowed_formats: ["jpg", "png", "jpeg", "webp", "mp4"],
          },
          (error, data) => {
            if (error) {
              return reject(error);
            }
            return resolve(data);
          },
        )
        .end(file.buffer);
    });
    uploadedFiles.push(result);
  }
  return uploadedFiles;
};

export default uploadFiles;
