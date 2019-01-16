

const express = require("express");
const bodyParser = require("body-parser");
const handleBars = require("express-handlebars");
const indexRouter = require("./routes/index");
const apiRouter = require("./routes/api/index");
const app = express(); //call express
const port = 3000; //port for server

app.engine("handlebars", handleBars({ defaultLayout : "main" })); //specify "main" as default .handlebars file
app.set("view engine", "handlebars"); //tell to use handlebars as rendering engine
app.use(bodyParser.urlencoded({ extended : false })); //no idea
app.use("/", indexRouter); //indexRouter = index.js
app.use("/api", apiRouter); //apiRouter = api/index.js
app.listen(port, () => console.log("Server is running...")); // start listening for server traffic