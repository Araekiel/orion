const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const hbs = require("express-handlebars");
const morganLogger = require("morgan");

const port = process.env.PORT || 108;
const server = express();

//Routes
const appRoute = require("./routes/appRoute.js");
const apiRoute = require("./routes/apiRoute.js");

server.engine("handlebars", hbs());
server.set("view engine", "handlebars");

server.use(express.static(path.join(__dirname, "../public")));
server.use(
  bodyParser.urlencoded({
    extended: false
  })
);
server.use(bodyParser.json());
server.use(morganLogger("dev"));

server.get("/", (req, res) => {
  res.status(200).render("indexPage", {
    layout: false
  });
});

server.use(appRoute.router);
server.use(apiRoute.router);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
