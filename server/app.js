const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const helmet = require("helmet");
dotenv.config();

// routes
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/userRoutes");
const statsRoutes = require("./routes/statsRoutes");
const requestRoutes = require("./routes/requestRoutes");

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/dashboard", statsRoutes);
app.use("/api/requests", requestRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use((req, res) => {
  return res.status(404).json({
    success: false,
    error: "Route not found",
  });
});

app.use(require("./middlewares/errorMiddleware"));

module.exports = app;
