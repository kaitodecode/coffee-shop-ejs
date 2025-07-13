
import { create, indexPage, destroy } from "../controllers/categoriesController";
import { Router } from "express";
import { authorizeRole } from "../middlewares/authorizeRole";

export const categoryRouter = Router();
categoryRouter.get("/", indexPage)
categoryRouter.post("/", create)
categoryRouter.post("/delete/:id", destroy)
