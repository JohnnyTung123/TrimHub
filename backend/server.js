require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { Server } = require("socket.io");

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware to parse JSON bodies
app.use(express.json());

// CORS configuration
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

// Custom routes
app.use("/auth", require("./routes/auth_route"));
app.use("/user", require("./routes/user_route"));
app.use("/salon-info", require("./routes/salon_info_route"));
app.use("/plan", require("./routes/plan_route"));
app.use("/chat", require("./routes/chat_route"));
app.use("/message", require("./routes/message_route"));

// Connect to MongoDB
mongoose.connect(process.env.DB_CONNECTION_KEY);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  const server = app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });

  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

  io.on("connection", (socket) => {
    console.log("Connected to socket.io");

    socket.on("join chat", (chatId) => {
      console.log("User join chat:", chatId);
      socket.join(chatId);
    });

    socket.on("message", (message) => {
      console.log("Received message:", message);
      const chat = message.chat;
      io.to(chat._id).emit("message", message);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected from socket.io");
    });
  });
});

mongoose.connection.on("error", (err) => {
  console.error(`Cannot connect to MongoDB: ${err}`);
});
