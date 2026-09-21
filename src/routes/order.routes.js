import express from "express";
import auth from "../middlewares/auth.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import orderController from "../controllers/order.controllers.js";
import { ROLE_ADMIN, ROLE_CUSTOMER } from "../constants/roles.js";
import validate from "../middlewares/validator.js";
import {
  orderSchema,
  orderStatusSchema,
} from "../libs/schemas/order.schema.js";

const router = express.Router();

router.get("/", auth, roleBasedAuth(ROLE_ADMIN), orderController.getAllOrders);

router.get(
  "/user",
  auth,
  roleBasedAuth(ROLE_CUSTOMER),
  orderController.getAllOrdersByUser,
);

router.get("/:id", auth, orderController.getOrderById);

router.post(
  "/",
  auth,
  roleBasedAuth(ROLE_CUSTOMER),
  validate(orderSchema),
  orderController.createOrder,
);

router.patch("/:id/cancel", auth, orderController.cancelOrder);

router.patch("/:id/confirm", auth, orderController.confirmOrder);

router.put(
  "/:id/status",
  auth,
  roleBasedAuth(ROLE_ADMIN),
  validate(orderStatusSchema),
  orderController.updateOrderStatus,
);

router.delete(
  "/:id",
  auth,
  roleBasedAuth(ROLE_ADMIN),
  orderController.deleteOrder,
);

export default router;
