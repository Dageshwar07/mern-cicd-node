// mongoC.js
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const password = process.env.MONGO_PASSWORD;
const connectionString = `mongodb+srv://Dageshwar07:${password}@cluster1.o9ihroc.mongodb.net/MERN-CICD`;

const client = new MongoClient(connectionString);
let db;

try {
  const conn = await client.connect();
  console.log("MongoDB connection successful");
  db = conn.db("MERN-CICD");
} catch (e) {
  console.error("MongoDB connection error:", e);
}

export default db;
