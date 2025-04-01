require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const app = express();
const authRoutes = require("./routes/authroutes");
const pollRoutes = require("./routes/pollRoutes");
const path = require("path");
// Middleware to handle CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
connectDB();

const _dirname = path.resolve(); // Get the current directory
// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/poll", pollRoutes);

// Server uploads folder
app.use("/uploads", express.static(path.join(_dirname, "/uploads")));
// app.use("/uploads", express.static("/tmp/"));
app.use(express.static(path.join(_dirname, "/frontend/vite-project/dist")));
app.get("*", (_, res) => {
  res.sendFile(
    path.resolve(_dirname, "frontend/vite-project", "dist", "index.html")
  );
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
