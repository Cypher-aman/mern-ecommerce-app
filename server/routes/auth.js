import { Router } from "express";
import { createUser, loginUser } from "../controller/auth.js";
import passport from "passport";

const route = Router();

route.post("/signup", createUser);
route.post("/login", loginUser);

export default route;
