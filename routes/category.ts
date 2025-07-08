
import { create, indexPage } from "../controllers/categoriesController";
import { Router } from "express";

export const categoryRouter = Router();
categoryRouter.get("/", indexPage)
categoryRouter.post("/", create)
