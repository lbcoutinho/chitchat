const express = require("express");
const app = express();
const path = require("path");

// Public folder and HTML render engine setup
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

// Routes
app.use("/", (req, res) => {
  res.render("index.html");
});

// HTTP server setup
const server = require("http").createServer(app);

// Socket.io setup
const io = require("socket.io")(server);
const messages = [];

// Socket.io setup
io.on("connection", socket => {
  console.log(`Socket connected: ${socket.id}`);

  // Capture new message from client
  socket.on("sendMessage", data => {
    messages.push(data);
    socket.broadcast.emit("receivedMessage", data); // TODO change to broadcast to specific socket id
  });

  // Send existing messages to new client
  socket.emit("previousMessages", messages);
});

// Init server
const port = 3000;
server.listen(port, console.log(`Server running on port ${port}.`));
