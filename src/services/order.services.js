import {
  ORDER_STATUS_CANCELLED,
  ORDER_STATUS_CONFIRMED,
  ORDER_STATUS_PENDING,
} from "../constants/orderStatuses.js";
import { ROLE_ADMIN } from "../constants/roles.js";
import Order from "../models/Order.js";
import crypto from "crypto";

const getAllOrders = async () => {
  return await Order.find()
    .populate("user", "name email phone")
    .populate("orderItems.product", "name brand category price imageUrls");
};

const getAllOrdersByUser = async (userId) => {
  const allOrders = await Order.find({ user: userId })
    .populate("user", "name email phone")
    .populate("orderItems.product", "name brand category price imageUrls");
  if (allOrders.length <= 0) {
    throw {
      statusCode: 404,
      message: "No Orders Made Yet!",
    };
  }
  return allOrders;
};

const getOrderById = async (id, user) => {
  const order = await Order.findById(id)
    .populate("user", "name email phone")
    .populate("orderItems.product", "name brand category price imageUrls");
  if (!order) {
    throw {
      statusCode: 404,
      message: "Order not found",
    };
  }
  if (order.user.toString() !== user._id && !user.roles.includes(ROLE_ADMIN)) {
    throw {
      statusCode: 403,
      message: "Access Denied",
    };
  }
  return order;
};

const createOrder = async (data, user) => {
  const orderNumber = crypto.randomUUID();

  let shippingAddress = { ...user.address };
  console.log(data);
  if (data?.shippingAddress) {
    shippingAddress = data.shippingAddress;
  }

  return await Order.create({
    ...data,
    user: user._id,
    orderNumber,
    shippingAddress,
  });
};

const cancelOrder = async (id, user) => {
  const order = await getOrderById(id, user);

  if (order.status !== ORDER_STATUS_PENDING) {
    throw {
      message: "Order cannot be cancelled.",
    };
  }

  return await Order.findByIdAndUpdate(
    id,
    { status: ORDER_STATUS_CANCELLED },
    { returnDocument: "after" },
  );
};

const confirmOrder = async (id, user) => {
  const order = await getOrderById(id, user);

  if (order.status !== ORDER_STATUS_PENDING) {
    throw {
      message: "Order cannot be confirmed.",
    };
  }

  //payment pending

  return await Order.findByIdAndUpdate(
    id,
    { status: ORDER_STATUS_CONFIRMED },
    { returnDocument: "after" },
  );
};

const updateOrderStatus = async (id, data) => {
  if (!data.status) {
    throw {
      message: "Status is required",
    };
  }
  return await Order.findByIdAndUpdate(
    id,
    { status: data.status },
    { returnDocument: "after" },
  );
};
const deleteOrder = async (id) => {
  await Order.findByIdAndDelete(id);
  return { message: "Order Successfully  Deleted." };
};

export default {
  getAllOrders,
  getOrderById,
  createOrder,
  deleteOrder,
  getAllOrdersByUser,
  cancelOrder,
  confirmOrder,
  updateOrderStatus,
};
