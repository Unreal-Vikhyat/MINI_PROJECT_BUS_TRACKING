const socket = io();

const urlParams = new URLSearchParams(window.location.search);
const role = urlParams.get("role");
const busId = urlParams.get("bus");

socket.emit("join-bus", busId);

let map, marker;

function initMap(lat, lng) {
    map = L.map("map").setView([lat, lng], 14);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);
    marker = L.marker([lat, lng]).addTo(map);
}

function updateBusMarker(lat, lng) {
    if (marker) {
        marker.setLatLng([lat, lng]);
    } else {
        marker = L.marker([lat, lng]).addTo(map);
    }
    map.setView([lat, lng]);
}

if (role === "driver") {
    // Driver shares real-time location
    navigator.geolocation.watchPosition((position) => {
        const { latitude, longitude } = position.coords;
        socket.emit("driver-location", { busId, lat: latitude, lng: longitude });
        if (!map) initMap(latitude, longitude);
        else updateBusMarker(latitude, longitude);
    });
} else if (role === "student") {
    // Student waits for driver updates
    map = L.map("map").setView([20.5937, 78.9629], 5); // India default
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    socket.on("bus-location", (data) => {
        updateBusMarker(data.lat, data.lng);
    });
}