import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { layoutMiddleware } from "./middlewares/layout_middleware";
import layout from "express-ejs-layouts";
import path from "path";
import { authRouter, categoryRouter, productRouter, errorRouter, dashboardRouter, orderRoute } from "./routes";      
import { pageNotFound } from "./controllers/errorController";
import { authMiddleware } from "./middlewares/auth_middleware";

const app = express()
const PORT = 3000

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(layout)
app.use(layoutMiddleware)
app.use('/app/orders', (req, res) => {
    res.render('order', { path: '/app/orders' });
});
app.use(cookieParser());

app.use("/css", express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use("/js", express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use("/js", express.static(path.join(__dirname, 'node_modules/jquery/dist')))
app.use("/html", express.static(path.join(__dirname, "./public")))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())

// controller



app.use("/", authRouter)
app.use("/app/categories", categoryRouter)
app.use("/app/products", productRouter)
app.use("/app/errors", errorRouter)
app.use("/app/dashboard", dashboardRouter)
app.use("/app/order", orderRoute)




app.use(pageNotFound)

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`))