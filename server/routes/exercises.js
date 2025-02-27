import express from "express";
import { Exercise } from "../models/exercise.model.js";

const router = express.Router();

// Create a new exercise
router.post("/", async (req, res) => {
    try {
        if
            (
            !req.body.username ||
            !req.body.description ||
            !req.body.duration ||
            !req.body.date
        ) {
            res.status(400).send({
                message: "Please send all required fields: 'username', 'description', 'duration', 'date'."
            });
        }
        const newExercise = {
            username: req.body.username,
            description: req.body.description,
            duration: Number(req.body.duration),
            date: Date.parse(req.body.date)
        };

        const exercise = await Exercise.create(newExercise);
        return res.status(201).json(exercise);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Retrieve all exercises
router.get("/", async (req, res) => {
    try {
        const exercises = await Exercise.find({});
        return res.status(200).json({
            count: exercises.length,
            data: exercises
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Retrieve one exercise by id 
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const exercise = await Exercise.findById(id);
        return res.status(200).json(exercise);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Update exercise information
router.put("/:id", async (req, res) => {
    try {
        if (
            !req.body.username ||
            !req.body.description ||
            !req.body.duration ||
            !req.body.date
        ) {
            res.status(400).json({
                message: "Please send all required fields: 'username', 'description', 'duration', 'date'."
            })
        }

        const { id } = req.params;
        const result = await Exercise.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).json({ message: "Exercise not found." });
        }

        return res.status(200).json({ message: "Exercise updated successfully!" });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Delete an exercise
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Exercise.findByIdAndDelete(id); 
        if (!result) {
            res.status(404).json({ message: "Exercise not found." });
        }
        return res.status(200).json({ message: "Exercise has been deleted." });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

export default router; 