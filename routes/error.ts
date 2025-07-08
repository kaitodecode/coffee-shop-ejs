import { pageNotFound, serverError, badRequest, unauthorized } from "../controllers/errorController";
import { Router } from "express";

export const errorRouter = Router();

errorRouter.get("/404", pageNotFound)
errorRouter.get("/500", serverError)
errorRouter.get("/400", badRequest)
errorRouter.get("/401", unauthorized)
