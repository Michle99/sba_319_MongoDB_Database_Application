import { MongoClient } from "mongodb";
import '../loadEnv.js'


const connectionString = process.env.MONGO_URI || "";

const client = new MongoClient(connectionString);

const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    const db = client.db("sample_mflix");
    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectToDatabase;