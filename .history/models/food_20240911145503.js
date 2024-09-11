const mongoose = require('mongoose');
const validator = require('mongoose-unique-validator');

const schema = mongoose.Schema({
    _id: {
        type: String,
        required: true,
        unique: true,
    },
    code: String,
    name: String,
    brand: String,
    photo: String,
    
    calories: Number,
    carbs: Number,
    fats: Number,
    proteins: Number
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
    }
};

module.exports = mongoose.model('Food', schema);
