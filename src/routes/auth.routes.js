import express from "express";
import authControllers from "../controllers/auth.controllers.js";
import { userSchema } from "../libs/schemas/user.schema.js";
import validate from "../middlewares/validator.js";
import { loginSchema } from "../libs/schemas/login.schema.js";
import {
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../libs/schemas/auth.schema.js";

const router = express.Router();
const registerSchema = userSchema;

router.post("/login", validate(loginSchema), authControllers.login);
router.post("/register", validate(registerSchema), authControllers.register);
router.post("/logout", authControllers.logout);

//email forget password and reset
router.post(
  "/forgot-password",
  validate(forgotPasswordSchema),
  authControllers.forgotPassword,
);
router.post(
  "/reset-password",
  validate(resetPasswordSchema),
  authControllers.resetPassword,
);
export default router;
