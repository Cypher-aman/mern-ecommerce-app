import { Router } from "express";
import {
  addToCart,
  deleteCart,
  fetchCartByUser,
  updateCart,
} from "../controller/cart.js";

const route = Router();

route.get("/", fetchCartByUser);
route.delete("/:id", deleteCart);
route.patch("/:id", updateCart);
route.post("/", addToCart);

export default route;
