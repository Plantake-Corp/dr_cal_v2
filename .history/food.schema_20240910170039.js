const mongoose = require('mongoose');

const foodSchema = mongoose.Schema({
    photo: String,
    name: String,
    calories: Number,
    protein: Number,
    carbs: Number,
    fats: Number,
    brand: String
});

module.exports = foodSchema;