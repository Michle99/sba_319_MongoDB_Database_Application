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
    } catch (error) {
      console.error("Error fetching movies:", error);
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
  } catch (error) {
    console.error("Error while getting movie by ID:", error);
    throw error;
  }
};


// Create a new movie
export const createMovie = async (newMovie) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("movies_testing");
    await collection.insertOne(newMovie);

    // console.log("data of Result in createMovie:", result);
    console.log("newMovie data in createMovie:", newMovie);
    return newMovie;
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
  } catch (error) {
    console.error("Error while deleting movie by ID:", error);
    throw error;
  }
};