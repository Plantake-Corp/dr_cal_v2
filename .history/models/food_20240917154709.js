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
    
    calories: {
        type: Number,
        default: 0,
    },
    carbs: {
        type: Number,
        default: 0,
    },
    fats: {
        type: Number,
        default: 0,
    },
    proteins: {
        type: Number,
        default: 0,
    },
    counter: {
        type: Number,
        default: 0,
    }
});

// schema.plugin(validator);

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
        counter: this.counter,
    }
};

module.exports = mongoose.model('Food', schema);
