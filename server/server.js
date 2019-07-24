const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const morganLogger = require("morgan");
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
server.use(morganLogger("dev"));

server.get("/", (req, res) => {
  res.status(200).render("indexPage.hbs");
});

//Use Promises for get-data functions.

function getPostsByTag(tag) {
  const url = `https://www.instagram.com/explore/tags/${tag}/?__a=1`;
  return new Promise((resolve, reject) => {
    request(url, { json: true }, async (err, response, body) => {
      if (err) {
        reject(err);
      } else {
        resolve(body);
      }
    });
  });
}

server.get("/feed", async (req, res) => {
  const tag = req.query.hashtag;
  const data = await getPostsByTag(tag);
  res.status(200).send(data);
});

server.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
