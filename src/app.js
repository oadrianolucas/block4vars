const express = require("express")
const path = require("path")
const { engine } = require("express-handlebars")
const bodyParser = require("body-parser")
const flash = require("connect-flash")
const moment = require("moment")
const session = require("express-session")
const app = express()
const routes = require("./routes")
app.use(express.urlencoded({ extended: true }))
app.use(
   session({
      secret: "erg0eg65256ge",
      cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
   })
)
require("dotenv").config()
app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))
app.use(express.static("public"))
app.use(express.static(path.join(__dirname, "/public")))
app.use(flash())
app.set("views", path.join(__dirname, "views"))
app.engine(
   ".hbs",
   engine({
      defaultLayout: "main",
      extname: "hbs",
      helpers: {
         formatDate: (date) => {
            return moment(date).format("DD/MM/YYYY")
         },
      },
   })
)
app.use((req, res, next) => {
   res.locals.success_msg = req.flash("success_msg")
   res.locals.error_msg = req.flash("error_msg")
   res.locals.user = req.session.user
   next()
})
app.set("view engine", ".hbs")
app.use("/", routes)

module.exports = app
