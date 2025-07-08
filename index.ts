import express from "express";
import cookieParser from "cookie-parser";
import { layoutMiddleware } from "./middlewares/layout_middleware";
import layout from "express-ejs-layouts";
import path from "path";
import { authRouter, categoryRouter, productRouter, errorRouter, dashboardRouter } from "./routes";      
import { pageNotFound } from "./controllers/errorController";

const app = express()
const PORT = 3000

app.set('view engine', 'ejs');
app.set('views', './views'); // default sudah 'views', tapi ini eksplisit
app.use(layout)
app.use(layoutMiddleware)

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
app.use("/app/customers", customerRouter)



app.use(pageNotFound)

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`))
