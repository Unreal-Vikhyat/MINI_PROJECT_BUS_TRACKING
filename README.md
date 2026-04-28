# 🚌 Real-Time Bus Tracking System 

A real-time web application that allows **drivers to share their live location** and **students to track the bus location along with their own position on a map**.

---

## 🚀 Features

### 👨‍✈️ Driver Side

* Share live GPS location using browser geolocation
* Real-time location updates using **Socket.IO**
* Bus represented with a custom 🚌 icon on the map

### 🎓 Student Side

* Track bus location in real-time
* See their own live location 📍 on the map
* Auto-adjust map to show both student and bus
* Live status updates (waiting / tracking)

---

## 🛠️ Tech Stack

* **Frontend:** HTML, CSS, JavaScript, EJS
* **Backend:** Node.js, Express.js
* **Real-Time Communication:** Socket.IO
* **Maps:** Leaflet.js + OpenStreetMap
* **Geolocation:** Browser Geolocation API

---

## 📁 Project Structure

```
mini_project_bus_tracking/
│
├── public/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── map-client.js
│
├── views/
│   ├── index.ejs
│   └── map.ejs
│
├── app.js
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/bus-tracking.git
cd bus-tracking
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run the server

```bash
npm start
```

### 4️⃣ Open in browser

```
http://localhost:3000
```

---

## 🧪 How to Use

### Step 1: Enter Bus Number

* Enter a unique bus number
* Select role: **Driver** or **Student**

### Step 2: Driver

* Allow location permission
* Start sharing location
* Bus marker appears and updates live

### Step 3: Student

* View bus location in real-time
* See your own location
* Map auto-adjusts for both markers

---

## 🌐 Routes

| Route                       | Description                     |
| --------------------------- | ------------------------------- |
| `/`                         | Landing page (enter bus + role) |
| `/map?role=driver&bus=123`  | Driver tracking page            |
| `/map?role=student&bus=123` | Student tracking page           |

---

## 🔄 Real-Time Flow

1. Driver joins a **bus room**
2. Driver sends location via Socket.IO
3. Server broadcasts location to that bus room
4. Students receive updates instantly
5. Map updates dynamically with markers

---

## 📸 Demo Preview

* 🚌 Bus moves in real-time
* 📍 Student location shown
* 🔄 Live sync using WebSockets

---

## ⚠️ Requirements

* Browser must allow **location access**
* Works best on **mobile devices or laptops with GPS/WiFi location**

---

## 💡 Future Improvements

* Add authentication (Driver login)
* Multiple buses tracking dashboard
* Route prediction & ETA calculation
* Push notifications for students
* Database integration (MongoDB/Firebase)

---

## 👨‍💻 Author

Developed by **Vikhyat Sharma**

---

## ⭐ If you like this project

Give it a ⭐ on GitHub and share it!

---
