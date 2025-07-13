import { orderPage } from "../controllers/OrderController";
import { Router } from "express";
import { authorizeRole } from "../middlewares/authorizeRole";

export const orderRoute = Router();

orderRoute.get("/", orderPage);
