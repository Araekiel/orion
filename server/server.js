const express = require("express");

const port = process.env.PORT || 108;
const server = express();

server.get("/", (req, res) => {
  res.status(200).send("socialhost");
});

server.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
