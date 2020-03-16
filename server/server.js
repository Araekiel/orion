const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const hbs = require("express-handlebars");
const morganLogger = require("morgan");
const request = require("request");

const port = process.env.PORT || 108;
const server = express();

// Modules
const { fetchInstagramData } = require("./modules/fetchInstagramData.js");
const { fetchTwitterData } = require("./modules/fetchTwitterData.js");

// Utils
const { shuffleArray } = require("./utils/shuffleArray.js");

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

server.get("/feed", async (req, res) => {
  const value = req.query.value;
  const [posts, usersObj, tweets] = await Promise.all([
    fetchInstagramData.fetchPosts(value),
    fetchInstagramData.fetchUsers(value),
    fetchTwitterData.fetchTweets(value)
  ]);
  const finalData = {
    mainData: usersObj.verified.concat(shuffleArray(posts.concat(tweets))),
    unverifiedUsers: usersObj.unverified
  };

  //Following piece of code will change over time
  if(finalData.mainData.length < 1) {
    if(finalData.unverifiedUsers.length > 0) {
      finalData.mainData = finalData.unverifiedUsers;
    } else {
      res.status(500).send("error: no data found");
    }
  }
  res.status(200).send(finalData.mainData);
});

server.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
