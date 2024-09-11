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
router.post("/all", async (req, res)=> {
    await Food.insertMany(req.body).then(()=>{
        res.status(200).json({
            message: "Foods inserted successfully!"
        });
    }).catch((err)=>{
        res.status(500).json({
            error: "There was a server side error!"
        });
    });
});

// PUT FOOD
router.put("/:id", async (req, res)=> {
    const fields = {
        _id: req.params.id,
    };
    const updates = {
        $set: {
            name: req.body.name
        },
    };

    const options = {
        useFindAndModify: false,
    };

    await Food.findByIdAndUpdate(fields, updates, options).then(()=>{ // update and feedback
        res.status(200).json({
            message: "Foods updated successfully!"
        });
    }).catch((err)=>{
        res.status(500).json({
            error: "There was a server side error!"
        });
    });

    return;
    await Food.updateOne(fields, updates).then(()=>{ // update and no feedback
        res.status(200).json({
            message: "Foods updated successfully!"
        });
    }).catch((err)=>{
        res.status(500).json({
            error: "There was a server side error!"
        });
    });
});

router.get("/search", async (req, res) => {

    res.status(200).json({
        data: [],
    });
    return;
    try {
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
    
        console.log(results);
        res.status(200).json({
            data: results,
        });
      } catch (error) {
        console.error("Error performing search:", error);
        res.status(500).json({
            error: "There was a server side error!"
        });
      }
});

module.exports = router;