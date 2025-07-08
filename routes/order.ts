import { orderPage } from "../controllers/OrderController";
import { Router } from "express";

export const orderRoute = Router();

orderRoute.get("/", orderPage);
