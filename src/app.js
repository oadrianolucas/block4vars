const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const moment = require("moment");
const session = require("express-session");
const app = express();
const routes = require("./routes");

//Sessions
app.use(
  session({
    secret: "erg0eg65256ge",
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
  })
);
require("dotenv").config();
app.set("port", process.env.PORT || 4000);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(flash());
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  engine({
    defaultLayout: "main",
    extname: "hbs",
    helpers: {
      formatDate: (date) => {
        return moment(date).format("DD/MM/YYYY");
      },
    },
  })
);

app.set("view engine", ".hbs");
app.use("/", routes);

module.exports = app;
