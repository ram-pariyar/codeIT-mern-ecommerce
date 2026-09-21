import mongoose from "mongoose";
import { emailRegex } from "../constants/regex.js";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Username is required"],
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    required: [true, "Email address is required"],
    minLength: 5,
    maxLength: 100,
    unique: true,
    lowercase: true,
    validate: {
      validator: (value) => {
        return emailRegex.test(value);
      },
      message: "Invalid email address.",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  roles: {
    type: [String],
    default: ["CUSTOMER"],
    enum: ["CUSTOMER", "MERCHANT", "ADMIN", "SUPER_ADMIN"],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    maxLength: 15,
    minLength: 6,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  address: {
    city: {
      type: String,
      required: true,
    },
    province: {
      type: String,
    },
    country: {
      type: String,
      default: "Nepal",
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  profileImageUrl: {
    type: String,
  },
});

export default mongoose.model("User", userSchema);
