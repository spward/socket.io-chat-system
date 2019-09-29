var express = require("express");
var app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));

io.on("connection", socket => {
  // Displays if a user connects
  socket.broadcast.emit("chat-message", "a user connected!");
  console.log("a user connected");

  // when someone disconnects
  socket.on("disconnect", () => {
    // Displays if a user disconnects
    console.log("user disconnected");
    socket.broadcast.emit("chat-message", "a user disconnected!");
  });
  socket.on("chat-message", msg => {
    io.emit("chat-message", msg);
  });
});

http.listen(PORT, () => {
  console.log(`Listening on *:${PORT}`);
});
