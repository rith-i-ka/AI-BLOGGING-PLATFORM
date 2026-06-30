const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const app = require("./app");
const connectDB = require("./config/db");

// Connect to MongoDB
connectDB();

// Get port from .env
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});