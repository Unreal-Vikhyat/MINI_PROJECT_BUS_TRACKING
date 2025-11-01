const socket = io({
    transports: ["websocket"],
    path: "/socket.io/",
});



const map = L.map('map').setView([20.5937, 78.9629], 5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 }).addTo(map);

// 🚌 Bus Icon
const busIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/1068/1068631.png',
    iconSize: [45, 45],
    iconAnchor: [22, 22],
    popupAnchor: [0, -20]
});

// 👨‍🎓 Student Icon
const studentIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    iconSize: [35, 35],
    iconAnchor: [17, 17],
    popupAnchor: [0, -15]
});

const urlParams = new URLSearchParams(window.location.search);
const busNumber = urlParams.get("bus");
const role = urlParams.get("role");
const status = document.getElementById("status");

let driverMarker, studentMarker;

// Join the specific bus room
socket.emit("joinBus", { busNumber, role });

// DRIVER SIDE → share location
if (role === "driver" && navigator.geolocation) {
    status.textContent = "Status: sharing location...";
    navigator.geolocation.watchPosition(position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        if (!driverMarker) {
            driverMarker = L.marker([latitude, longitude], { icon: busIcon }).addTo(map).bindPopup("🚌 Bus");
            map.setView([latitude, longitude], 14);
        } else {
            driverMarker.setLatLng([latitude, longitude]);
        }

        socket.emit("driverLocation", { busNumber, latitude, longitude });
    }, err => {
        console.error(err);
        status.textContent = "Status: location unavailable";
    }, { enableHighAccuracy: true });
}

// STUDENT SIDE → show their own location + bus location
if (role === "student" && navigator.geolocation) {
    navigator.geolocation.watchPosition(position => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        if (!studentMarker) {
            studentMarker = L.marker([lat, lng], { icon: studentIcon }).addTo(map).bindPopup("📍 You");
            map.setView([lat, lng], 14);
        } else {
            studentMarker.setLatLng([lat, lng]);
        }
    });

    // Listen for bus updates in real time
    socket.on("busLocationUpdate", ({ latitude, longitude }) => {
        status.textContent = "Status: tracking bus...";

        if (!driverMarker) {
            driverMarker = L.marker([latitude, longitude], { icon: busIcon }).addTo(map).bindPopup("🚌 Bus");
        } else {
            driverMarker.setLatLng([latitude, longitude]);
        }

        // Auto-fit both markers (optional)
        if (studentMarker && driverMarker) {
            const group = L.featureGroup([studentMarker, driverMarker]);
            map.fitBounds(group.getBounds(), { padding: [50, 50] });
        }
    });
}