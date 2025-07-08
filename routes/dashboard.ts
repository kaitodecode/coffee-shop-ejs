import { Router } from "express";
import { dashboardPage } from "../controllers/dashboardController";


export const dashboardRouter = Router();
dashboardRouter.get("/", dashboardPage)
