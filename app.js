const express = require("express");
const app = express();
const dotenv = require("dotenv");
const articleController = require("./controller/article.controller");

articleController(app);

dotenv.config();
const port = process.env.PORT ? process.env.PORT : 8080;
app.listen(port);

console.log("server started on port " + port);