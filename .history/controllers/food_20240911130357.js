const Food = require('../models/food');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

// @desc insertion for food
// @route POST /foods
// @access private
// @required fields {name}
// @return Food
const insert = asyncHandler(async (req, res) => {

    const {body} = req.body;

    if (!body || !body.name) {
        return res.status(400).json({message: "Name field is required"});
    }


    const data = {
        "name": body.name,
        "brand": body.brand,
        "photo": body.photo,
        "calories": body.calories,
        "carbs": body.carbs,
        "fats": body.fats,
        "proteins": body.proteins,
    };

    const response = await Food.create(data);

    if (response) { 
        res.status(201).json({
            data: response.toJson()
        })
    } else {
        res.status(422).json({
            error: "Unable to insert a food"
        });
    }
});

// @desc get data by id
// @route GET /foods/{id}
// @access private
// @required params {id}
// @return Food
const getById = asyncHandler(async (req, res) => {
    const id = req.id;

    if (!id){
        return res.status(400).json({
            error: "Id param is required!"
        });
    }

    const response = await Food.findOne({_id: id}).exec();

    if (!response){
        return res.status(404).json({
            error: "Not Found!"
        });
    }

    res.status(200).json({
        data: response.toJson(),
    });
});

// @desc update data by id
// @route PUT /foods/{id}
// @access private
// @required params {id}
// @return Food
const updateById = asyncHandler(async (req, res) => {
    const id = req.id;

    if (!id){
        return res.status(400).json({
            error: "Id param is required!"
        });
    }

    const {body} = req.body;

    if (!body){
        return res.status(400).json({
            error: "Body is required!"
        });
    }

    const fields = {
        _id: id,
    };

    const updates = {
        $set: body,
    };

    const options = {
        new: true, // to provide updated value
        useFindAndModify: false,
    };

    try {
        const result = await Food.findByIdAndUpdate(fields, updates, options);
    
        if (!result){
            return res.status(404).json({error: "Not Found!"});
        }

        res.status(200).json({data: result});
        
    } catch (error) {
        res.status(500).json({error});
    }
});

module.exports = {
    insert,
    getById,
    updateById,
}
