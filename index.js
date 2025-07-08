const express = require("express");
const cookieParser = require("cookie-parser");
const app = express()
layout = require("express-ejs-layouts")

const PORT = 3000
const path = require("path")

app.set('view engine', 'ejs');
app.set('views', './views'); // default sudah 'views', tapi ini eksplisit
app.use(layout)
app.use((req, res, next) => {
    if (req.path.startsWith('/app')) {
        res.locals.layout = 'layouts/appLayout';
    }else{
        res.locals.layout = 'layout';
    }
    console.log(`Path: ${req.path}, Using layout: ${res.locals.layout}`);
    next();
});

app.use("/css", express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use("/js", express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use("/js", express.static(path.join(__dirname, 'node_modules/jquery/dist')))
app.use("/html", express.static(path.join(__dirname, "./public")))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
// controller
const LoginController = require("./controllers/authController")
const ErrorAppController = require("./controllers/errorController")
const CategoryController = require("./controllers/categoriesController");
const productController = require("./controllers/productController")

app.get("/", LoginController.loginPage);
app.post("/", LoginController.login)
app.get("/register", LoginController.registerPage);
app.post("/register", LoginController.register);

app.get("/app/categories", CategoryController.indexPage)
app.post("/app/categories", CategoryController.create)

app.get("/app/products", productController.indexPage)
app.post("/app/products", productController.create)

app.use(ErrorAppController.pageNotFound)
app.use(ErrorAppController.serverError)

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`))
