import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  brand: {
    type: String,
    required: [true, "Brand is required"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [1, "Price must be greater than 0"],
    max: [99999, "Price must be less than 100000"],
  },
  stock: {
    type: Number,
    min: 0,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  imageUrls: [String],
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("Product", productSchema);
