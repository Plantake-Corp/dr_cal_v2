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
    console.log(req.body);
    res.status(200).json({});
    return;
    const newFood = new Food(req.body);
    await newFood.save((err)=>{
        if (err){
            res.status(500).json({
                error: "There was a server side error!"
            });
        } else {
            res.status(200).json({
                error: "Food inserted successfully!"
            });
        }
    });
});

// POST MULTIPLE FOODS
router.post("/all", async (req, res)=> {});

// PUT FOOD
router.put("/:id", async (req, res)=> {});

module.exports = router;``