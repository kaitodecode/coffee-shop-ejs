import { Router } from "express";
import * as CustomerController from "../controllers/customerController";

export const customerRouter = Router();

customerRouter.get("/app/customers", CustomerController.indexPage);
customerRouter.post("/app/customers", CustomerController.create);

