import { Router } from "express";
import {
  createOrder,
  fetchOrderByUser,
  fetchOrders,
  updateOrder,
} from "../controller/order.js";

const route = Router();

route.get("/", fetchOrderByUser);
route.get("/all", fetchOrders);
route.post("/", createOrder);
route.patch("/:id", updateOrder);

export default route;
