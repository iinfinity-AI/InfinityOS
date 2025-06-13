const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const routes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const { initNotification } = require("./controllers/notifyController");
const moodRoutes = require("./routes/moodRoutes");
const goalRoutes = require("./routes/goalRoutes");
const orgRoutes = require("./routes/orgRoute");
const statsRoutes = require("./routes/analyticsRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const http = require("http");
const socketIo = require("socket.io");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

connectDB();

// Routes
app.use("/api/goal", goalRoutes);
app.use("/api", routes);
app.use("/api", taskRoutes);
app.use("/api", moodRoutes);
app.use("/api", orgRoutes);
app.use("/api/status", statsRoutes);
app.use("/api/notifications", notificationRoutes);

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Store active user connections
const userSockets = {};

// Initialize notification controller with Socket.io
initNotification(io, userSockets);

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("login", (userId) => {
    userSockets[userId] = socket.id;
    console.log(`User ${userId} logged in with socket ${socket.id}`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    Object.keys(userSockets).forEach((userId) => {
      if (userSockets[userId] === socket.id) {
        delete userSockets[userId];
      }
    });
  });
});

// Export io instance to use in controllers
app.set("io", io);
app.set("userSockets", userSockets);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
