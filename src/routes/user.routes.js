import express from "express";
import userContollers from "../controllers/user.contollers.js";
import auth from "../middlewares/auth.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import { ROLE_ADMIN } from "../constants/roles.js";
import validate from "../middlewares/validator.js";
import {
  updatePasswordSchema,
  userSchema,
} from "../libs/schemas/user.schema.js";

const router = express.Router();

router.get("/", auth, roleBasedAuth(ROLE_ADMIN), userContollers.getUsers);

router.get("/me", auth, userContollers.getAuthUser);

router.get("/:id", auth, roleBasedAuth(ROLE_ADMIN), userContollers.getUser);

router.post(
  "/",
  auth,
  roleBasedAuth(ROLE_ADMIN),
  validate(userSchema),
  userContollers.createUser,
);

router.put("/profile-image", auth, userContollers.updateProfileImage);

router.put("/me", auth, userContollers.updateAuthUser);

router.put(
  "/me/change-password",
  auth,
  validate(updatePasswordSchema),
  userContollers.updateAuthUserPassword,
);

router.put(
  "/:userId",
  auth,
  roleBasedAuth(ROLE_ADMIN),
  userContollers.updateUser,
);

router.put(
  "/:userId/change-password",
  auth,
  roleBasedAuth(ROLE_ADMIN),
  userContollers.updatePassword,
);

router.delete(
  "/:id",
  auth,
  roleBasedAuth(ROLE_ADMIN),
  userContollers.deleteUser,
);

export default router;
