import { Router } from "express";
import { UsersPage, create, update, destroy } from "../controllers/userController";

export const usersRouter = Router();
usersRouter.get("/", UsersPage)
usersRouter.post("/", create)
usersRouter.post("/update/:id", update)
usersRouter.post("/delete/:id", destroy)
