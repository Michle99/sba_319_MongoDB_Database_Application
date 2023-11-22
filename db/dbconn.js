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
    required: ["plot", "genres", "cast", "poster", "title", "type"],
    properties: {
      plot: { bsonType: "string" },
      genres: { bsonType: "array", items: { bsonType: "string" } },
      runtime: { bsonType: "int" },
      cast: { bsonType: "array", items: { bsonType: "string" } },
      num_mflix_comments: { bsonType: "int" },
      poster: { bsonType: "string" },
      title: { bsonType: "string" },
      fullplot: { bsonType: "string" },
      languages: { bsonType: "array", items: { bsonType: "string" } },
      released: { bsonType: "date" },
      directors: { bsonType: "array", items: { bsonType: "string" } },
      writers: { bsonType: "array", items: { bsonType: "string" } },
      awards: {
        bsonType: "object",
        properties: {
          wins: { bsonType: "int" },
          nominations: { bsonType: "int" },
          text: { bsonType: "string" }
        }
      },
      lastupdated: { bsonType: "date" },
      year: { bsonType: "int" },
      imdb: {
        bsonType: "object",
        properties: {
          rating: { bsonType: "double" },
          votes: { bsonType: "int" },
          id: { bsonType: "int" }
        }
      },
      countries: { bsonType: "array", items: { bsonType: "string" } },
      type: { bsonType: "string" },
      tomatoes: {
        bsonType: "object",
        properties: {
          viewer: {
            bsonType: "object",
            properties: {
              rating: { bsonType: "double" },
              numReviews: { bsonType: "int" },
              meter: { bsonType: "int" }
            }
          },
          lastUpdated: { bsonType: "date" }
        }
      }
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