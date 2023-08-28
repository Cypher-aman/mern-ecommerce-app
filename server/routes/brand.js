import { Router } from "express";
import { fetchBrands } from "../controller/brand.js";

const route = Router();

route.get("/", fetchBrands);

export default route;
