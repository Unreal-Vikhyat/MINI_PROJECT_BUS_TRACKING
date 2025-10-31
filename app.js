const express = require("express");
const http = require("http");
const path = require("path");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/map", (req, res) => {
    const { role, bus } = req.query;
    res.render("map", { role, bus });
});

// ✅ Real-time location sharing
io.on("connection", (socket) => {
    console.log("User connected");

    socket.on("joinBus", ({ busNumber, role }) => {
        socket.join(busNumber);
        console.log(`${role} joined bus ${busNumber}`);
    });

    socket.on("driverLocation", ({ busNumber, latitude, longitude }) => {
        io.to(busNumber).emit("busLocationUpdate", { latitude, longitude });
    });

    socket.on("disconnect", () => console.log("User disconnected"));
});

const PORT = 3000;
server.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));