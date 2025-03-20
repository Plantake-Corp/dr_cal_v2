const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Brand Schema
const brandSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true }
});

// Define Default Serving Schema
const defaultServingSchema = new Schema({
  isDefault: { type: Boolean, required: true },
  name: { type: String, required: true },
  scale: { type: Number, required: true },
  type: { type: String, required: true }
});

// Define Nutrients Schema
const nutrientsSchema = new Schema({
  calcium: { type: Number },
  cholesterol: { type: Number },
  energy: { type: Number },
  fat: { type: Number },
  fiber: { type: Number },
  iron: { type: Number },
  protein: { type: Number },
  satFat: { type: Number },
  sodium: { type: Number },
  sugar: { type: Number },
  totalCarbs: { type: Number },
  transFat: { type: Number }
});

// Define Tag Schema
const tagSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true }
});

// Define Food Item Schema
const foodItemSchema = new Schema({
  brand: { type: brandSchema, required: true },
  classification: { type: String, required: true },
  defaultServing: { type: defaultServingSchema, required: true },
  foodId: { type: String, required: true },
  name: { type: String, required: true },
  nutrients: { type: nutrientsSchema, required: true },
  revisionId: { type: String, required: true },
  servings: { type: [defaultServingSchema], required: true },
  tags: { type: [tagSchema], required: true }
});

// Create and export the model
const FoodItem = mongoose.model('Food', foodItemSchema);
module.exports = FoodItem;