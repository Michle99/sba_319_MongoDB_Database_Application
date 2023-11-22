import connectToDatabase from '../db/dbconn.js';
import { ObjectId } from 'mongodb';

// Get all movies
export const getAllMovies = async (req, res) => {
    try {
      const db = await connectToDatabase();
      let collection = db.collection("movies_testing");
      let results = await collection.find().limit(5).toArray();
      // console.log("Results:", results);
      return results;
      // res.json({results}).status(200);
    } catch (error) {
      console.error("Error fetching movies:", error);
      // res.status(500).send("Internal Server Error");
      throw error;
    }
};

// Get movie by ID
export const getMovieById = async (movieId) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("movies_testing");

    if (!ObjectId.isValid(movieId)) {
      return null;
    }
    const query = { _id: new ObjectId(movieId) };
    const getMovie = await collection.findOne(query);
    // console.log("Get Movie: ", getMovie)

    return getMovie;
    // if (!getMovie) {
    //   res.status(404).send("Movie Not found");
    //   return;
    // }
    // res.status(200).json({ message: "Movie successfully Retrieved!", getMovie });
  } catch (error) {
    console.error("Error while getting movie by ID:", error);
    throw error;
    // res.status(500).send("Internal Server Error");
  }
};


// Create a new movie
export const createMovie = async (newMovie) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("movies_testing");
    // const newMovie = req.body;
    // newMovie.date = new Date();
    let result = await collection.insertOne(newMovie);

    // console.log("data of Result in createMovie:", result);
    // console.log("newMovie data in createMovie:", newMovie);
    return newMovie;
    // res.status(200).json({ message: "Movie successfully added!", newMovie, result });
  } catch (error) {
    console.error("Error while creating a new movie:", error);
    throw error;
  }
};


export const updateMovie = async (movieId, updatedData) => {
  try {
      const db = await connectToDatabase();
      let collection = db.collection("movies_testing");
      if (!ObjectId.isValid(movieId)) {
        return null;
      }
      const query = { _id: new ObjectId(movieId) };
      let update = { $set: updatedData };
      // let updateArrays =  { $push: updatedData };
      let result = await collection.findOneAndUpdate(query, update, { returnDocument: 'after' });
      // console.log("data of 'result' from the updateMovie controller:", result);
      if (result) {
        return result;
      } else {
        throw new Error('Movie not found.');
      }
  } catch (error) {
      console.error("Error updating movie:", error);
      throw error;
  }
};


// Delete movie by ID
export const deleteMovie = async (movieId) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("movies_testing");

    if (!ObjectId.isValid(movieId)) {
      return null;
    }
    const query = { _id: new ObjectId(movieId) };
    const deletedMovie = await collection.deleteOne(query);
    console.log("------------Deleted Movie data in the deleteMovie controller:\n", deletedMovie);

    return deletedMovie;
    // res.status(200).json({ message: "Movie successfully deleted!", getDeletedMovie, deletedMovie });
  } catch (error) {
    console.error("Error while deleting movie by ID:", error);
    throw error;
  }
};