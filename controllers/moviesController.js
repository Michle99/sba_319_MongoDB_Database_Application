import connectToDatabase from '../db/dbconn.js';
import { ObjectId } from 'mongodb';

// Get all movies
export const getAllMovies = async (req, res) => {
    try {
      const db = await connectToDatabase();
      let collection = db.collection("movies_testing");
      let results = await collection.find().limit(5).toArray();
      res.send(results).status(200);
    } catch (error) {
      console.error("Error fetching movies:", error);
      res.status(500).send("Internal Server Error");
    }
};

// Get movie by ID
export const getMovieById = async (req, res) => {
    const db = await connectToDatabase();
    let collection = db.collection("movies_testing");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);
  
    if (!result) res.send("Movie Not found").status(404);
    else res.send(result).status(200);
};



// Create a new movie
export const createMovie = async (req, res) => {
  const db = await connectToDatabase();
  let collection = db.collection("movies_testing");
  let newMovie = req.body;
  newMovie.date = new Date();
  let result = await collection.insertOne(newMovie);
  console.log("Contents of result:", result)
  console.log("Contents of newMovie:", newMovie)
  res.json({ message: "Movie successfully added!", newMovie, result }).status(204);
};
  

// Update movie by ID
export const updateMovie = async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: { type: req.body.type },
      // $push: { genres: req.body.genres },
      // $push: { genres: { $each:  req.body.genres } }
      // $currentDate: { lastModified: true }
    };
    const db = await connectToDatabase();
    let collection = db.collection("movies_testing");
    let result = await collection.updateOne(query, updates);
    let updatedMovie = await collection.findOne(query);

    res.json({ message: "Movie successfully added!", updatedMovie, result }).status(204);
  } catch (error) {
    console.error("Error updating movie data:", error);
    res.status(500).send("Internal Server Error");
  }
};


// Delete movie by ID
export const deleteMovie = async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };
  
    const db = await connectToDatabase();
    const collection = db.collection("movies_testing");
    let result = await collection.deleteOne(query);
  
    res.send(result).status(200);
};