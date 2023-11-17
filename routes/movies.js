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
       console.log("Movies collection:", collection);
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


export default router;