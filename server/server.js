const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const data = require("./data.json");
const axios = require("axios");
// const responseTime = require('response-time')
const redis = require("redis");
const client = redis.createClient();
client.on("error", (error) => console.error(error));
//Create a middleware that adds a X-Response-Time header to responses.
// app.use(responseTime());
var cors = require("cors");
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded());

const { Server } = require("socket.io");
const io = new Server(server);
io.emit("some event", {
  someProperty: "some value",
  otherProperty: "other value",
}); // This will emit the event to all connected sockets
io.on("connection", (socket) => {
  socket.broadcast.emit("hi");
});
io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

app.get("/", (req, res) => {
  res.send("on");
});
app.get("/data", (req, res) => {
  res.json(data);
});
const getDogs = async (req, res) => {
  try {
    client.get("dogsdata", async (err, result) => {
      if (result) {
        res.send(result);

        ``;
      } else {
        const dogs = await axios.get("http://localhost:4000/data");

        // Set the string-key:dogsdata in our cache. With he contents of the cache
        // Set cache expiration to 1 hour (60 minutes)

        client.setex("dogsdata", 3600, circularJSON.stringify(dogs));
        res.send("kk");
      }
    });
  } catch (error) {
    console.error(error);
    res.send("Something went wrong!!!");
  }
};

app.get("/data/students", getDogs);
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(4000, () => {
  console.log("listening on *:3000");
});
