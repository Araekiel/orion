const express = require("express");
const request = require("request");

const router = express.Router();

const { webFeedProcessor } = require("../modules/webFeedProcessor.js");

// @route: /img?url="image_url"
// @desc: This route act as a proxy to get an image from the instagram cdn and send it to the client
router.get("/img", async(req, res) => {
  let headers = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:55.0) Gecko/20100101 Firefox/55.0",
  }
  let query = req.query;
  var url = Object.keys(query).map((key) => `${key}=${query[key]}`).join("&").replace("url=", "");
  request.get({url:url, headers:headers, encoding:null}, (err, response, body) => {
    res.set('Content-Type', 'image/jpeg');
    res.send(body);
  });
});

router.get("/webfeed", async (req, res, next) => {
  const value = req.query.value;
  
  webFeedProcessor(value).then((processedData) => {
    res.status(200).send(processedData.mainData);
  }).catch((err) => {
    let error = new Error(err);
    res.status(500);
    next(error);
  });
});

module.exports = {
    router
}