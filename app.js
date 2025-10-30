const express = require("express");
const http = require("http");
const path = require("path");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Set EJS as template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/map", (req, res) => {
    const { role, bus } = req.query;
    res.render("map", { role, bus });
});

// Socket.io logic
io.on("connection", (socket) => {
    console.log("🟢 A user connected");

    socket.on("join-bus", (busId) => {
        socket.join(busId);
        console.log(`User joined bus ${busId}`);
    });

    socket.on("driver-location", (data) => {
        io.to(data.busId).emit("bus-location", data);
    });

    socket.on("disconnect", () => {
        console.log("🔴 A user disconnected");
    });
});

// Start server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});