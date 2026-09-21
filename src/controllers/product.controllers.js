import productServices from "../services/product.services.js";

const createProduct = async (req, res) => {
  try {
    const createdProduct = await productServices.createProduct(
      req.body,
      req.files,
      req.user._id,
    );
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const queries = req.query;
    const products = await productServices.getProducts(queries);
    res.json(products);
  } catch (error) {
    res.status(400).json({ message: error.messate });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await productServices.getProductById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(error.statusCode || 400).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await productServices.updateProduct(
      req.params.id,
      req.body,
      req.user._id,
      req.files,
    );
    res.json(product);
  } catch (error) {
    res.status(error.statusCode || 400).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await productServices.deleteProduct(
      req.params.id,
      req.user._id,
    );
    res.json(product);
  } catch (error) {
    res.status(error.statusCode || 400).json({ message: error.message });
  }
};

const getBrands = async (req, res) => {
  try {
    const products = await productServices.getBrands();
    res.json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const products = await productServices.getCategories();
    res.json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
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
