"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors")); // For handling Cross-Origin Resource Sharing
const dbconfig_1 = require("./config/dbconfig");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
dotenv_1.default.config(); // Load environment variables
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000; // Use port from .env or default to 5000
// Middleware
app.use(express_1.default.json()); // To parse JSON request bodies
app.use((0, cors_1.default)()); // Enable CORS for all origins (adjust in production)
// Connect to MongoDB and then start the server
(0, dbconfig_1.connectDB)().then(() => {
    // Routes
    app.use('/api/auth', authRoutes_1.default); // All auth routes will be prefixed with /api/auth
    // Basic health check route
    app.get('/', (req, res) => {
        res.send('API is running...');
    });
    // Start the server
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log(`Access login at http://localhost:${PORT}/api/auth/login`);
        console.log(`Access register at http://localhost:${PORT}/api/auth/register`);
    });
}).catch((error) => {
    console.error("Failed to start server due to DB connection error:", error);
    process.exit(1);
});
