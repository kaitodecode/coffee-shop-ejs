import { Router } from "express";
import * as CustomerController from "../controllers/customerController";

export const customerRouter = Router();

// GET halaman customer
customerRouter.get("/", CustomerController.indexPage);

// POST tambah customer
customerRouter.post("/", CustomerController.create);

// DELETE hapus customer
customerRouter.post("/delete/:id", CustomerController.deleteCustomer);