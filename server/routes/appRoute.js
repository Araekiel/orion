const express = require("express");
const bodyParser = require("body-parser");

const router = express.Router();

const { fetchInstagramData } = require("./../modules/fetchInstagramData.js");
const { fetchTwitterData } = require("./../modules/fetchTwitterData.js");

const { dataController } = require("./../modules/dataController.js");

const { shuffleArray } = require("./../utils/shuffleArray.js");

router.use(
  bodyParser.urlencoded({
    extended: false
  })
);
router.use(bodyParser.json());

router.get("/webfeed", async (req, res) => {
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

module.exports = {
    router
}