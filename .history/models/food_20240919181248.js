const mongoose = require('mongoose');
const validator = require('mongoose-unique-validator');

const schema = mongoose.Schema({
    code: {
        type: String,        
        required: true,    
        unique: true,
    },
    name: String,
    brand: String,
    photo: String,
    
    calories: Number,
    carbs: Number,
    fats: Number,
    proteins: Number,
    counter: {
        type: Number,
        default: 0,
    }
});

module.exports = mongoose.model('Food', schema);
