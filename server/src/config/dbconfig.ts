// src/config/db.ts
import { MongoClient, Db, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI;

let _db: Db;

export const connectDB = async () => {
  if (!uri) {
    console.error("MONGODB_URI is not defined in the .env file.");
    process.exit(1);
  }

  try {
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });

    await client.connect();

    await client.db("admin").command({ ping: 1 });
    console.log("MongoDB successfully connected!");

    _db = client.db("dezignshark_db");

  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export const getDb = (): Db => {
  if (!_db) {
    throw new Error("Database not initialized. Call connectDB first.");
  }
  return _db;
};