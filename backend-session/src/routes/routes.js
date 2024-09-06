import { Router } from "express";
import {
  login,
  session,
  logout,
  register,
} from "../controllers/controllers.js";
export const sessionRoutes = Router();

sessionRoutes.post("/login", login);

sessionRoutes.post("/register", register);

sessionRoutes.get("/session", session);

sessionRoutes.post("/logout", logout);
