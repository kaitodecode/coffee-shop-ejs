import { Router } from "express";
import { UsersPage, create, update, destroy } from "../controllers/userController";
import { authorizeRole } from "../middlewares/authorizeRole";

export const usersRouter = Router();
usersRouter.get("/", UsersPage);
usersRouter.post("/", create);
usersRouter.post("/:id/update", update);
usersRouter.post("/:id/delete", destroy);
