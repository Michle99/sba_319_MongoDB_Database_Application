import { MongoClient } from "mongodb";
import '../loadEnv.js'

let connectionString = process.env.MONGO_URI || "";
const client = new MongoClient(connectionString);

if (process.env.NODE_ENV === "testing") {
  connectionString = process.env.MONGO_URI;
}

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

const applyValidationRules = async () => {
  try {
    const db = await connectToDatabase();

    // Apply the validation rules to the movies collection
    await db.command({
      collMod: "movies_testing",
      validator: validationRules,
      validationAction: "error",
    });

    console.log("Validation rules applied successfully.");
  } catch (error) {
    console.error("Error applying validation rules:", error);
  }
};

// Calling the function to apply validation rules
applyValidationRules();

export default connectToDatabase;