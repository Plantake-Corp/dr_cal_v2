const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const foodSchema = require('./food.schema');

const Food = new mongoose.model("Food", foodSchema);

// GET ALL FOODS
router.get("/?search=query", async (req, res)=> {
    try {
        const userInput = req.params.query;
        const results = await Food.aggregate([
          {
            $search: {
              index: "default", 
              compound: {
                should: [
                  {
                    autocomplete: {
                      query: userInput,
                      path: "foodName", 
                      fuzzy: {
                        maxEdits: 2,
                        prefixLength: 2
                      }
                    }
                  },
                  {
                    autocomplete: {
                      query: userInput,
                      path: "brand", 
                      fuzzy: {
                        maxEdits: 2,
                        prefixLength: 2
                      }
                    }
                  }
                ]
              }
            }
          },
          { $limit: 10 }
        ]);
        res.status(200).json({
            data: results,
        });
    } catch (error) {
        res.status(500).json({
            error,
        });
    }
});

// GET A FOOD BY ID
router.get("/:id", async (req, res)=> {
    try {
        const results = await Food.find({_id: req.params.id});
        res.status(200).json({
            data: results,
        });
    } catch (error) {
        res.status(500).json({
            error,
        });
    }
});

router.get("/", async (req, res)=> {
    try {
        const results = await Food.find();
        res.status(200).json({
            data: results,
        });
    } catch (error) {
        res.status(500).json({
            error,
        });
    }
});

// POST FOOD
router.post("/", async (req, res)=> {
    const newFood = new Food(req.body);
    await newFood.save().then(()=>{
        res.status(200).json({
            message: "Food inserted successfully!",
            id: newFood._id,
        });
    }).catch((err)=>{
        res.status(500).json({
            error: "There was a server side error!"
        });
    });
});

// POST MULTIPLE FOODS
router.post("/", async (req, res)=> {
    try {
        const result = await Food.insertMany(req.body); 
        res.status(200).json({
            message: "Foods inserted successfully!"
        });
    } catch (error) {
        res.status(500).json({
            error
        });
    }
});

// PUT FOOD
router.put("/:id", async (req, res)=> {
    const fields = {
        _id: req.params.id,
    };

    const updates = {
        $set: req.body,
    };

    const options = {
        new: true, // to provide updated value
        useFindAndModify: false,
    };
    
    try {
        const result = await Food.findByIdAndUpdate(fields, updates, options);
        res.status(200).json({
            data: result,
        });
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
});

// GET A FOOD BY ID
router.delete("/:id", async (req, res)=> {
    try {
        const results = await Food.deleteOne({_id: req.params.id});
        res.status(200).json({
            data: results,
        });
    } catch (error) {
        res.status(500).json({
            error,
        });
    }
});

module.exports = router;