const express = require("express");
const server = express();

const userRouter = require("./routes/user");
const studentRouter = require("./routes/student");

server.use(express.json());
server.use(express.urlencoded({extend:true}));

server.use(express.static("./public"));

server.use((req,res,next) => {
    res.set("Access-Control-Allow-Origin","*");
    next();
});

server.use("/api",[userRouter,studentRouter]);



server.listen(3000);