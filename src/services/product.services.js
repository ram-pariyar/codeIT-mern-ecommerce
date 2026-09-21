import formatProductPrompt from "../helpers/productsPrompt.js";
import Product from "../models/Product.js";
import uploadFiles from "../utils/fileUploader.js";
import promptAI from "../utils/prompt.js";

const createProduct = async (data, files, userId) => {
  const uploadedFiles = await uploadFiles(files);

  let description = data?.description;
  if (!description) {
    const descriptionPrompt = formatProductPrompt(data);
    description = await promptAI(descriptionPrompt);
  }
  const imageUrls = uploadedFiles.map((item) => item.url);
  return await Product.create({
    ...data,
    createdBy: userId,
    imageUrls,
    description,
  });
};

const getProducts = async (queries) => {
  const limit = queries?.limit;
  const sort = queries?.sort ? JSON.parse(queries.sort) : null;
  const offset = queries?.offset;

  //filters
  const filters = {};
  if (queries?.category) filters.category = queries?.category;
  if (queries?.createdBy) filters.createdBy = queries?.createdBy;
  if (queries?.brands) filters.brand = { $in: queries?.brands.split(",") };
  if (queries?.name) filters.name = { $regex: queries?.name, $options: "i" }; //case insensitive
  if (queries?.min) filters.price = { $gte: queries?.min };
  if (queries?.max) filters.price = { ...filters.price, $lte: queries?.max };

  return await Product.find(filters).limit(limit).sort(sort).skip(offset);
};

const getProductById = async (id) => {
  const product = await Product.findById(id);
  if (!product) {
    throw {
      statusCode: 404,
      message: "Product not found",
    };
  }
  return product;
};

const updateProduct = async (id, data, userId, files) => {
  const product = await Product.findById(id);
  if (!product) {
    throw {
      statusCode: 404,
      message: "Product not found",
    };
  }
  if (product.createdBy.toString() !== userId) {
    throw {
      statusCode: 403,
      message: "Access Denied",
    };
  }
  const updateData = data;

  if (!data.description) {
    const descriptionPrompt = formatProductPrompt(data);
    updateData.description = await promptAI(descriptionPrompt);
  }
  if (files && files.length > 0) {
    const uploadedFiles = await uploadFiles(files);
    updateData.imageUrls = uploadedFiles.map((item) => item.url);
  }

  return await Product.findByIdAndUpdate(id, updateData, {
    returnDocument: "after",
  });
};

const deleteProduct = async (id, userId) => {
  const product = await Product.findById(id);
  if (!product) {
    throw {
      statusCode: 404,
      message: "Product not found",
    };
  }

  if (product.createdBy.toString() !== userId) {
    throw {
      statusCode: 404,
      message: "Access Denied",
    };
  }
  await Product.findByIdAndDelete(id);
  return { message: "Product deleted successfully." };
};

const getBrands = async () => {
  const brands = await Product?.distinct("brand");
  const isBrandEmpty = brands.length === 0;
  if (isBrandEmpty) {
    throw {
      message: "No Brands Has Been Added.",
    };
  }
  if (!brands) {
    throw {
      message: "Brands not found",
    };
  }
  return brands;
};

const getCategories = async () => {
  const categories = await Product?.distinct("category");
  const isCategoriesEmpty = categories.length === 0;
  if (isCategoriesEmpty) {
    throw {
      message: "No Categories Has Been Added.",
    };
  }
  if (!categories) {
    throw {
      message: "Brands not found",
    };
  }
  return categories;
};

export default {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getBrands,
  getCategories,
};
