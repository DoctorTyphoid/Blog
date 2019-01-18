const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const handleBars = require("express-handlebars");
const indexRouter = require("./routes/index");

const app = express(); //call express
const port = 3000; //port for server
const db = require("./db");

app.engine("handlebars", handleBars({ defaultLayout: "main" })); //specify "main" as default .handlebars file
app.set("view engine", "handlebars"); //tell to use handlebars as rendering engine

app.use(bodyParser.urlencoded({ extended: false })); //no idea
app.use(
  session({ secret: "secret", saveUninitialized: "false", resave: "false" })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  res.locals.phone = "(123)1231234";
  res.locals.email = "email@example.com";
  next();
});

app.use("/", indexRouter); //indexRouter = index.js

app.listen(port, () => console.log("Server is running...")); // start listening for server traffic
