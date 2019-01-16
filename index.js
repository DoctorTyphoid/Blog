

const express = require("express");
const bodyParser = require("body-parser");
const handleBars = require("express-handlebars");
const indexRouter = require("./routes/index");
const apiRouter = require("./routes/api/index");
const app = express(); 
const port = 3000; 

app.engine("handlebars", handleBars({ defaultLayout : "main" }));
app.set("view engine", "handlebars");
app.use(bodyParser.urlencoded({ extended : false }));
app.use("/", indexRouter);
app.use("/api", apiRouter);
app.listen(port, () => console.log("Server is running..."));

