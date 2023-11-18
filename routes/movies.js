import express from 'express';
import connectToDatabase from '../db/dbconn.js';
import { ObjectId } from 'mongodb';

const router = express.Router();

/*********************************************/
//              GET ALL MOVIES
/*********************************************/
router.get('/', async (req, res) => {
    try {
       const db = await connectToDatabase();
       let collection = db.collection("movies");
    //    console.log("Movies collection:", collection);
       let results = await collection.find({}).limit(5).toArray();
       res.send(results).status(200);
    } catch (error) {
        console.error("Error fetching movies:", error);
        res.status(500).send("Internal Server Error");
    }
});


/*********************************************/
//              GET MOVIES BY ID
/*********************************************/
router.get('/:id', async (req, res) => {
    const db = await connectToDatabase();
    let collection = db.collection("movies");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) res.send("Movie Not found").status(404);
    else res.send(result).status(200);
})


/*********************************************/
//              POST NEW MOVIE 
/*********************************************/
router.post('/', async (req, res) => {
    const db = await connectToDatabase();
    let collection = db.collection("movies");
    let newMovie = req.body;
    newMovie.date = new Date();
    let result = await collection.insertOne(newMovie);
    res.send(result).status(204);
})


/*********************************************/
//              UPDATE MOVIE BY ID
/*********************************************/
router.put("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };
        const updates = {
        $set: { type: req.body.type },
        // $push: { genres: req.body.genres },
        // $push: { genres: { $each:  req.body.genres } }
        // $currentDate: { lastModified: true }
        };
        const db = await connectToDatabase();
        let collection = db.collection("movies");
        let result = await collection.updateOne(query, updates);
    
        res.send(result).status(200);
    } catch (error) {
        console.error("Error updating movie data:", error);
        res.status(500).send("Internal Server Error");
    }
});


/*********************************************/
//              DELETE MOVIE BY ID
/*********************************************/
router.delete("/:id", async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };

    const db = await connectToDatabase();
    const collection = db.collection("movies");
    let result = await collection.deleteOne(query);
  
    res.send(result).status(200);
});

export default router;