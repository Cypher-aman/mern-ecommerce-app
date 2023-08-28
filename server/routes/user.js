import { Router } from "express";
import { fetchUserById, updateUser } from "../controller/user.js";

const route = Router();

route.get("/:id", fetchUserById);
route.patch("/:id", updateUser);

export default route;
