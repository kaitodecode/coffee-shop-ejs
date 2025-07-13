import { Router } from "express";
import { create, destroy, indexPage, update} from "../controllers/productController";
import { authorizeRole } from "../middlewares/authorizeRole";

export const productRouter = Router();
productRouter.get("/", indexPage)
productRouter.post("/", create)
productRouter.post("/update/:id", update)
productRouter.post("/delete/:id", destroy)