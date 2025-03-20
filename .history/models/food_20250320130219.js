const mongoose = require('mongoose');
const validator = require('mongoose-unique-validator');

const { Schema } = mongoose;

const foodSchema = new Schema({
    code: {
        type: String,
        required: [true, 'Food code is required'],
        unique: true,  // Ensures unique constraint
    },
    name: {
        type: String,
        required: true,  // Ensures name is required
    },
    brand: {
        type: String,
    },
    photo: {
        type: String,
    },
    calories: {
        type: Number,
        min: [0, 'Calories must be a positive number'],  // Ensures calories can't be negative
    },
    carbs: {
        type: Number,
        min: [0, 'Carbs must be a positive number'],  // Ensures carbs can't be negative
    },
    fats: {
        type: Number,
        min: [0, 'Fats must be a positive number'],  // Ensures fats can't be negative
    },
    proteins: {
        type: Number,
        min: [0, 'Proteins must be a positive number'],  // Ensures proteins can't be negative
    },
    counter: {
        type: Number,
        default: 0,
    }
});

// Adding unique validator plugin to ensure uniqueness
foodSchema.plugin(validator);

// Custom method to convert to JSON
foodSchema.methods.toJson = function() {
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
    };
};

// Index to improve performance on `code`
foodSchema.index({ code: 1 });

module.exports = mongoose.model('Food', foodSchema);
