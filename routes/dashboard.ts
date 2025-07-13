import { Router } from "express";
import { dashboardPage } from "../controllers/dashboardController";
import { authorizeRole } from "../middlewares/authorizeRole";


export const dashboardRouter = Router();
dashboardRouter.get("/", dashboardPage)
