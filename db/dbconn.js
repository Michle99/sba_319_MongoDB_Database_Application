import { MongoClient } from "mongodb";
import '../loadEnv.js'


const connectionString = process.env.MONGO_URI || "";

const client = new MongoClient(connectionString);

// Define validation rules for the db
const validationRules = {
  $jsonSchema: {
    bsonType: "object",
    required: ["plot", "genres", "type", "title", "poster", "cast", "fullplot", "runtime"],
    properties: {
      plot: { bsonType: "string" },
      genres: {
        bsonType: "array",
        items: { bsonType: "string" }
      },
      type: { bsonType: "string" },
      title: { bsonType: "string" },
      poster: { bsonType: "string" },
      cast: {
        bsonType: "array",
        items: { bsonType: "string" }
      },
      fullplot: { bsonType: "string" },
      runtime: { bsonType: "int" }
    }
  }
};

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

try {
  // Apply the validation rules to the grades collection
  await db.command({
    collMod: "movies",
    validator: validationRules,
    validationAction: "warn",
  });
  console.log("Validation rules applied successfully.");
} catch (error) {
  console.error("Error applying validation rules:", error);
}

export default connectToDatabase;