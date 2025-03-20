const mongoose = require('mongoose');
const validator = require('mongoose-unique-validator');

const { Schema } = mongoose;

// Define Brand Schema
const brandSchema = new Schema({
  id: { type: String, required: false },
  name: { type: String, required: false }
});

// Define Default Serving Schema
const defaultServingSchema = new Schema({
  isDefault: { type: Boolean, required: false },
  name: { type: String, required: false },
  scale: { type: Number, required: false },
  type: { type: String, required: false }
});

// Define Nutrients Schema
const nutrientsSchema = new Schema({
  calcium: { type: Number, required: false },
  cholesterol: { type: Number, required: false },
  energy: { type: Number, required: false },
  fat: { type: Number, required: false },
  fiber: { type: Number, required: false },
  iron: { type: Number, required: false },
  potassium: { type: Number, required: false },
  protein: { type: Number, required: false },
  satFat: { type: Number, required: false },
  sodium: { type: Number, required: false },
  sugar: { type: Number, required: false },
  totalCarbs: { type: Number, required: false },
  transFat: { type: Number, required: false }
});

// Define Tag Schema
const tagSchema = new Schema({
  id: { type: String, required: false },
  name: { type: String, required: false }
});

// Define Food Item Schema
const foodItemSchema = new Schema({
  brand: { type: brandSchema, required: false },
  classification: { type: String, required: false },
  defaultServing: { type: defaultServingSchema, required: false },
  foodId: { type: String, required: false },
  name: { type: String, required: false },
  nutrients: { type: nutrientsSchema, required: false },
  revisionId: { type: String, required: false },
  servings: { type: [defaultServingSchema], required: false },
  tags: { type: [tagSchema], required: false }
});


// Adding unique validator plugin to ensure uniqueness
foodItemSchema.plugin(validator);

foodItemSchema.methods.toJson = function() {
  return {
      id: this._id || null,
      name: this.name || null,
      brand: this.brand ? {
          id: this.brand.id || null,
          name: this.brand.name || null
      } : null,
      classification: this.classification || null,
      defaultServing: this.defaultServing ? {
          isDefault: this.defaultServing.isDefault !== undefined ? this.defaultServing.isDefault : null,
          name: this.defaultServing.name || null,
          scale: this.defaultServing.scale || null,
          type: this.defaultServing.type || null
      } : null,
      foodId: this.foodId || null,
      nutrients: this.nutrients ? {
          calcium: this.nutrients.calcium || null,
          cholesterol: this.nutrients.cholesterol || null,
          energy: this.nutrients.energy || null,
          fat: this.nutrients.fat || null,
          fiber: this.nutrients.fiber || null,
          iron: this.nutrients.iron || null,
          protein: this.nutrients.protein || null,
          satFat: this.nutrients.satFat || null,
          sodium: this.nutrients.sodium || null,
          sugar: this.nutrients.sugar || null,
          totalCarbs: this.nutrients.totalCarbs || null,
          transFat: this.nutrients.transFat || null
      } : null,
      revisionId: this.revisionId || null,
      servings: this.servings || null,
      tags: this.tags || null
  };
};

// Create and export the model
const FoodItem = mongoose.model('Food', foodItemSchema);
module.exports = FoodItem;


/*

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


*/