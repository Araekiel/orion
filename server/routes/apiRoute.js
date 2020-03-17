const express = require("express");
const bodyParser = require("body-parser");

const router = express.Router();

router.use(
  bodyParser.urlencoded({
    extended: false
  })
);
router.use(bodyParser.json());

router.get("/api", (req, res) => {
    res.status(200).send("Working on API");
});

module.exports = {
    router
};