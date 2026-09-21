import userServices from "../services/user.services.js";

const getUsers = async (req, res) => {
  const users = await userServices.getUsers();
  res.json(users);
};

const getUser = async (req, res) => {
  try {
    const user = await userServices.getUser(req.params.id, req.user._id);
    if (!user) {
      return res.send("User not found");
    }
    res.json(user);
  } catch (error) {
    res.status(error.statusCode || 400).json({ message: error.message });
  }
};

const getAuthUser = async (req, res) => {
  try {
    const user = await userServices.getUserById(req.user._id);
    if (!user) {
      return res.send("User not found");
    }
    res.json(user);
  } catch (error) {
    res.status(error.statusCode || 400).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userServices.getUserById(req.params.id);
    if (!user) {
      return res.send("User not found");
    }
    res.json(user);
  } catch (error) {
    res.status(error.statusCode || 400).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const createdUser = await userServices.createUser(req.body);
    res.json(createdUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const data = await userServices.updateUser(req.params.userId, req.body);
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateAuthUser = async (req, res) => {
  try {
    const data = await userServices.updateUser(req.user._id, req.body);
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updatePassword = async (req, res) => {
  try {
    const data = await userServices.updatePassword(req.params.userId, req.body);
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateAuthUserPassword = async (req, res) => {
  try {
    const data = await userServices.updateAuthUserPassword(
      req.user._id,
      req.body,
    );
    res.json({
      name: data.name,
      email: data.email,
      address: data.address,
      phone: data.phone,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await userServices.deleteUser(req.params.id);
    res.json({
      message: `User deleted. id:${req.params.id}`,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateProfileImage = async (req, res) => {
  try {
    const data = await userServices.updateProfileImage(req.user._id, req.file);
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  updateProfileImage,
  getUserById,
  getAuthUser,
  updateAuthUser,
  updatePassword,
  updateAuthUserPassword,
};
