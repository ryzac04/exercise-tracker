import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 5000;
const URI = process.env.ATLAS_URI;

app.use(cors());
app.use(express.json());

mongoose
    .connect(URI)
    .then(() => {
        console.log("App connected to database.");
        app.listen(port, () => {
            console.log(`App is listening on port: ${port}.`);
        });
    })
    .catch((error) => {
        console.log(error);
    });