import { Router } from "express";
import { register, login, registerPage, loginPage, logout } from "../controllers/authController";
import { authorizeRole } from "../middlewares/authorizeRole";

export const authRouter = Router();
authRouter.get("/", loginPage);
authRouter.post("/login", login as any);
authRouter.get("/register", registerPage);
authRouter.post("/register", register as any);
authRouter.post("/logout", logout)