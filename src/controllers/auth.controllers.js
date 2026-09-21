import authServices from "../services/auth.services.js";
import jwt from "../utils/jwt.js";
const register = async (req, res) => {
  try {
    const data = await authServices.register(req.body);
    const token = jwt.generateToken(data);

    //storing token in cookeis
    res.cookie("authToken", token, {
      maxAge: 360000,
    });
    res.json(data);
  } catch (error) {
    res.status(error.statusCode || 400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const data = await authServices.login(req.body);
    const token = jwt.generateToken(data);

    //storing token in cookeis
    res.cookie("authToken", token, {
      maxAge: 360000,
    });
    res.json(data);
  } catch (error) {
    res.status(error.statusCode || 400).json({ message: error.message });
  }
};

const logout = (req, res) => {
  res.clearCookie("authToken");
  res.json({ message: "Logout Sucessful." });
};

const forgotPassword = async (req, res) => {
  try {
    const data = await authServices.forgotPassword(req.body);
    res.json(data);
  } catch (error) {
    res.status(error.statuCode || 400).json({ message: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const data = await authServices.resetPassword(req.body);
    res.json(data);
  } catch (error) {
    res.status(error.statusCode || 400).json({ message: error.message });
  }
};

export default { login, register, logout, forgotPassword, resetPassword };
