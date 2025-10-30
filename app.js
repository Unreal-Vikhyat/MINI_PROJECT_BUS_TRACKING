<<<<<<< HEAD
const express = require("express");
const app = express();
const path = require("path");

const http = require("http");
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // optional but best practice

// ✅ Correct way to serve static files
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
    socket.on("send-location", function(data) {
        io.emit("receive-location", { id: socket.id, ...data });
    })
    socket.on("disconnect", function() {
        io.emit("user-disconnected", socket.id)
    })
});

app.get("/", (req, res) => {
    res.render("index");
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
=======
const express = require("express");
const app = express();
const path = require("path");

const http = require("http");
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // optional but best practice

// ✅ Correct way to serve static files
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
    socket.on("send-location", function(data) {
        io.emit("receive-location", { id: socket.id, ...data });
    })
    socket.on("disconnect", function() {
        io.emit("user-disconnected", socket.id)
    })
});

app.get("/", (req, res) => {
    res.render("index");
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
>>>>>>> 4e8a82c9f5fb3f9e3d481023cd1f7422091f5a26
});