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
  try {
    const db = await connectToDatabase();
    const collection = db.collection("movies_testing");
    const query = { _id: new ObjectId(req.params.id) };
    const getMovie = await collection.findOne(query);

    if (!getMovie) {
      res.status(404).send("Movie Not found");
      return;
    }
    res.status(200).json({ message: "Movie successfully Retrieved!", getMovie });
  } catch (error) {
    console.error("Error while getting movie by ID:", error);
    res.status(500).send("Internal Server Error");
  }
};


// Create a new movie
export const createMovie = async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("movies_testing");
    const newMovie = req.body;
    newMovie.date = new Date();
    const result = await collection.insertOne(newMovie);
    // console.log("Result of data in createMovie:", result);
    // console.log("newMovie data in createMovie:", newMovie);
    res.status(200).json({ message: "Movie successfully added!", newMovie, result });
  } catch (error) {
    console.error("Error while creating a new movie:", error);
    res.status(400).send("Bad Request");
  }
};

  

// Update movie by ID
export const updateMovie = async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: { title: req.body.title },
      // $push: { genres: req.body.genres },
      // $push: { genres: { $each:  req.body.genres } }
      // $currentDate: { lastModified: true }
    };
    const db = await connectToDatabase();
    let collection = db.collection("movies_testing");
    let result = await collection.updateOne(query, updates);
    if (result.matchedCount === 0) {
      res.status(404).json({ message: 'Movie not found.' });
    } else {
      const getMovie = await collection.findOne(query);
      res.status(200).json({ message: 'Movie successfully updated!', updatedMovie: getMovie });
  }
  } catch (error) {
    console.error("Error updating movie data:", error);
    res.status(500).send("Internal Server Error");
  }
};


// Delete movie by ID
export const deleteMovie = async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const db = await connectToDatabase();
    const collection = db.collection("movies_testing");
    const deletedMovie = await collection.deleteOne(query);
    const getDeletedMovie = collection.find(query).toArray();

    res.status(200).json({ message: "Movie successfully deleted!", getDeletedMovie, deletedMovie });
  } catch (error) {
    console.error("Error while deleting movie by ID:", error);
    res.status(500).send("Internal Server Error");
  }
};