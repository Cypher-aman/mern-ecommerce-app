import { Router } from "express";
import {
  createProduct,
  fetchProductById,
  fetchProducts,
  updateProduct,
} from "../controller/product.js";

const route = Router();

route.get("/", fetchProducts);
route.get("/:id", fetchProductById);
route.post("/", createProduct);
route.patch("/:id", updateProduct);

export default route;
