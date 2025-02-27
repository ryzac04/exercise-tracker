import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import usersRouter from "./routes/users.js";
import exercisesRouter from "./routes/exercises.js"; 

const app = express();
const port = process.env.PORT || 5000;
const URI = process.env.ATLAS_URI;

// Middleware for handling CORS Policy
app.use(cors());
// Middleware for parsing request body
app.use(express.json());

// Routes middleware
app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter); 

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