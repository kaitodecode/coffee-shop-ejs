import { Router } from "express";
import { register, login, registerPage, loginPage } from "../controllers/authController";

export const authRouter = Router();
authRouter.get("/", loginPage);
authRouter.post("/", login as any);
authRouter.get("/register", registerPage);
authRouter.post("/register", register as any);
