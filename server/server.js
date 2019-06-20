const express = require("express");
const hbs = require("hbs");
const path = require("path");
const bodyParser = require("body-parser");
const morganLogger = require("morgan");

const port = process.env.PORT || 108;
const server = express();

server.use(express.static(path.join(__dirname, "../public")));
server.use(
  bodyParser.urlencoded({
    extended: false
  })
);
server.use(bodyParser.json());
server.use(morganLogger("dev"));

server.get("/", (req, res) => {
  res.status(200).render("indexPage.hbs");
});

server.post("/redirect", (req, res) => {
  res.redirect("/search");
});

server.get("/hunt", (req, res) => {
  res.status(200).render("searchPage.hbs", {
    searchTerm: req.query.q
  });
});

server.get("/search/:id", (req, res) => {
  res.send(req.params);
});

server.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
