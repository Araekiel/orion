const express = require("express");
const hbs = require("hbs");
const path = require("path");
const bodyParser = require("body-parser");
const request = require("request");

const port = process.env.PORT || 108;
const server = express();

server.use(express.static(path.join(__dirname, "../public")));
server.use(
  bodyParser.urlencoded({
    extended: false
  })
);
server.use(bodyParser.json());

server.get("/", (req, res) => {
  res.status(200).render("indexPage.hbs");
});

server.get("/feed", (req, res) => {
  const url = `https://www.instagram.com/explore/tags/${
    req.query.hashtag
  }/?__a=1`;
  request(url, { json: true }, (err, response, body) => {
    if (err) {
      return console.log(err);
    }
    res.status(200).send(body);
  });
});

server.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
