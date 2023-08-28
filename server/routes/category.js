import { Router } from "express";
import { fetchCategories } from "../controller/category.js";

const route = Router();

route.get("/", fetchCategories);

export default route;
