import { pageNotFound, serverError } from "../controllers/errorController";
import { Router } from "express";

export const errorRouter = Router();

errorRouter.get("/app/404", pageNotFound)
errorRouter.get("/app/500", serverError)
