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
    counter: Number
});

schema.plugin(validator);

schema.methods.toJson = function() {
    return {
        id: this._id,
        code: this.code,
        name: this.name,
        brand: this.brand,
        photo: this.photo,
        calories: this.calories,
        carbs: this.carbs,
        fats: this.fats,
        proteins: this.proteins,
        popularity: this.popularity,
    }
};

module.exports = mongoose.model('Food', schema);
