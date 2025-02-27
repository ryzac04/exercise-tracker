import express from "express";
import { User } from "../models/user.model.js";

const router = express.Router(); 

// Create a new user
router.post("/", async (req, res) => {
    try {
        if (
            !req.body.username
        ) {
            return res.status(400).json({
                message: "Please send required field: 'username'."
            });
        }
        const newUser = {
            name: req.body.username
        };

        const user = await User.create(newUser);
        return res.status(201).json(user); 
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Retrieve all users
router.get("/", async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json({
            count: users.length,
            data: users
        }); 
    } catch (error) {
        console.log(error.message); 
        res.status(500).send({ message: error.message }); 
    }
});

// Retrieve one user by id
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id); 
        return res.status(200).json(user); 
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message }); 
    }
}); 

export default router; 