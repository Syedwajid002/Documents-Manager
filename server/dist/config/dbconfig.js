"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDb = exports.connectDB = void 0;
// src/config/db.ts
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables from .env file
// Use MONGODB_URI consistent with previous discussions and common practice
const uri = process.env.MONGO_URI;
// Declare _db here so it's accessible throughout the module
let _db;
const connectDB = async () => {
    if (!uri) {
        console.error("MONGODB_URI is not defined in the .env file.");
        // It's crucial to exit or throw an error if the URI is missing
        process.exit(1);
    }
    try {
        const client = new mongodb_1.MongoClient(uri, {
            serverApi: {
                version: mongodb_1.ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });
        // Connect the client to the server
        await client.connect();
        // Ping the database to confirm connection
        await client.db("admin").command({ ping: 1 });
        console.log("MongoDB successfully connected!");
        // Store the database instance for later use.
        // Replace "dezignshark_db" with the actual name of your database if different.
        _db = client.db("dezignshark_db");
    }
    catch (error) {
        console.error("MongoDB connection error:", error);
        // Exit the process if unable to connect to the database, as the app can't function
        process.exit(1);
    }
};
exports.connectDB = connectDB;
// Function to get the connected database instance
const getDb = () => {
    if (!_db) {
        // This error should ideally not be thrown if connectDB is called on app startup
        throw new Error("Database not initialized. Call connectDB first.");
    }
    return _db;
};
exports.getDb = getDb;
