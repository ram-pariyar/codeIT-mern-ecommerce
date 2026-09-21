import User from "../models/User.js";
import uploadedFiles from "../utils/fileUploader.js";
import bcrypt from "bcrypt";

const getUsers = async () => {
  const users = await User.find();
  return users;
};

const getUser = async (id, userId) => {
  if (id !== userId) {
    throw {
      statusCode: 403,
      message: "Access Denied",
    };
  }
  const user = await User.findById(id);
  return user;
};

const getUserById = async (id) => {
  const user = await User.findById(id);
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    address: user.address,
    roles: user.roles,
    createdAt: user.createdAt,
    phone: user.phone,
    isActive: user.isActive,
  };
};

const createUser = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = await User.create({ ...data, password: hashedPassword });
  return user;
};

const updateUser = async (id, input) => {
  const updatedUser = await User.findById(id);
  if (!updatedUser) {
    throw {
      statusCode: 400,
      message: "User not found",
    };
  }
  return await User.findByIdAndUpdate(
    id,
    {
      name: input.name,
      phone: input.phone,
      address: input.address,
      email: input.email,
      role: input.roles,
      isActive: input.isActive,
    },
    { returnDocument: "after" },
  );
};

const updateAuthUser = async (id, input) => {
  const updatedUser = await User.findById(id);

  if (!updatedUser) {
    throw {
      statusCode: 400,
      message: "User not found",
    };
  }
  return await User.findByIdAndUpdate(
    id,
    {
      name: input.name,
      phone: input.phone,
      address: input.address,
      email: input.email,
    },
    { returnDocument: "after" },
  );
};

const updatePassword = async (id, input) => {
  if (!input && !input.password) {
    throw {
      message: "Password is required",
    };
  }
  const updatedUser = await User.findById(id);

  if (!updatedUser) {
    throw {
      statusCode: 400,
      message: "User not found",
    };
  }

  const hashedPassword = await bcrypt.hash(input.password, 10);
  return await User.findByIdAndUpdate(
    id,
    {
      password: hashedPassword,
    },
    { returnDocument: "after" },
  );
};

const updateAuthUserPassword = async (id, input) => {
  if (!input && !input.currentPassword) {
    throw {
      message: "Password is required",
    };
  }

  const user = await User.findById(id);
  if (!user) {
    throw {
      statusCode: 400,
      message: "User not found",
    };
  }
  const isCurrentPasswordMatch = await bcrypt.compare(
    input.currentPassword,
    user.password,
  );
  if (!isCurrentPasswordMatch) {
    throw {
      message: "Current Password Incorrect!",
    };
  }
  const hashedPassword = await bcrypt.hash(input.newPassword, 10);
  return await User.findByIdAndUpdate(
    id,
    {
      password: hashedPassword,
    },
    { returnDocument: "after" },
  );
};

const deleteUser = async (id) => {
  const deletedUser = await User.findById(id);
  if (!deletedUser) {
    throw {
      statuseCode: 400,
      message: "User not found",
    };
  }
  await User.findByIdAndDelete(id);
  // const deletedUser = await User.findByIdAndDelete(id);
};

const updateProfileImage = async (id, file) => {
  const uploadedFile = await uploadedFiles([file]);
  return User.findByIdAndUpdate(
    id,
    { profileImageUrl: uploadedFile[0].url },
    { returnDocument: "after" },
  );
};

export default {
  getUser,
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  updateProfileImage,
  getUserById,
  updateAuthUser,
  updatePassword,
  updateAuthUserPassword,
};
