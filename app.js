import express from 'express';
import './loadEnv.js'


const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());

app.use((err, _req, res, next) => {
    res.status(500).send("Uh oh! An unexpected error occured.");
});

app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`);
});