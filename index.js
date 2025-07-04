const express = require("express");
const app = express()
const layout = require("express-ejs-layouts") 

const PORT = 3000
const path = require("path")

app.set('view engine', 'ejs');
app.set('views', './views'); // default sudah 'views', tapi ini eksplisit

const StaticAppController = require("./controllers/staticAppController.js")
const ErrorAppController = require("./controllers/errorController.js")
app.use("/css", express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use("/js", express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use("/js", express.static(path.join(__dirname, 'node_modules/jquery/dist')))
app.use("/html", express.static(path.join(__dirname,"./public")))
app.use(layout)
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.get("/", StaticAppController.getHomePage);
app.get("/subscribe", StaticAppController.getSubscribePage);
app.post("/subscribe", StaticAppController.saveSubcriber);
// app.get("/thankyou", StaticAppController.getThankyouPage);
app.use(ErrorAppController.pageNotFound)
app.use(ErrorAppController.serverError)


app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`))
