const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");

// Load variables from .env
dotenv.config();

// Create the Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);


// Test route
app.get("/", (req, res) => {
    res.send("Welcome to the AI Blogging Platform API!");
});

module.exports = app;