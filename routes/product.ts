import { Router } from "express";
import { create, indexPage} from "../controllers/productController";

export const productRouter = Router();
productRouter.get("/app/products", indexPage as any)
productRouter.post("/app/products", create)
