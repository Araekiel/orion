const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const morganLogger = require("morgan");
const request = require("request");

const port = process.env.PORT || 108;
const server = express();

// Modules
const { fetchInstagramData } = require("./modules/fetchInstagramData.js");

// Utils
const { shuffleArray } = require("./utils/shuffleArray.js");

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

server.get("/feed", async (req, res) => {
  const value = req.query.value;
  const [posts, usersObj] = await Promise.all([
    fetchInstagramData.fetchPosts(value),
    fetchInstagramData.fetchUsers(value)
  ]);
  const finalData = usersObj["verified"].concat(
    shuffleArray(usersObj["unverified"].concat(posts))
  );
  if(finalData.length > 0) {
    res.status(200).send(finalData);
  } else {
    res.status(500).send("error: no data found");
  }
  
});

server.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
