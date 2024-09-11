const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const foodSchema = require('./food.schema');

const Food = new mongoose.model("Food", foodSchema);

// GET ALL FOODS
router.get("/", async (req, res)=> {
    res.status(200).json({
        data : []
    });
});

// GET A FOOD BY ID
router.get("/:id", async (req, res)=> {});

// POST FOOD
router.post("/", async (req, res)=> {
    const newFood = new Food(req.body);
    await newFood.save().then(()=>{
        res.status(200).json({
            message: "Food inserted successfully!"
        });
    }).catch((err)=>{
        res.status(500).json({
            error: "There was a server side error!"
        });
    });
});

// POST MULTIPLE FOODS
router.post("/all", async (req, res)=> {});

// PUT FOOD
router.put("/:id", async (req, res)=> {});

module.exports = router;