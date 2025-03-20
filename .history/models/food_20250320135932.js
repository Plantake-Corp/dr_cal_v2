const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

// Create and export the model
const FoodItem = mongoose.model('Food', foodItemSchema);
module.exports = FoodItem;
