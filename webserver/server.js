const express = require("express");
const server = express();

server.use(express.static("./public"));

server.listen(8080);