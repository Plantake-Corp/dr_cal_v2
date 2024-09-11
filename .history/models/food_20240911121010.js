const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const jwt = require("jsonwebtoken");

const schema = mongoose.Schema({

    photo: String,
    name: {
        type: String,
        required: true,
    },
    brand: String,
    calories: Number,
    proteins: Number,
    carbs: Number,
    fats: Number
});

schema.plugin(uniqueValidator);

schema.methods.toJson = function() {
    return {
        name: this.name,
        photo: this.photo,
        calories: this.calories,
        protein: this.protein,
        protein: this.protein,
    }
};

module.exports = mongoose.model('Food', schema);
