import jwt from "../utils/jwt.js";

const auth = (req, res, next) => {
  const cookie = req.headers.cookie;
  const token = cookie?.split("=")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const data = jwt.verifyToken(token);
    req.user = data; //adding authenticated user data in request so it can be accessed for authorization
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

export default auth;
