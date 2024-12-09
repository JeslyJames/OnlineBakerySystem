const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Product name is required"] },
  description: { type: String, required: [true, "Product description is required"] },
  price: { type: Number, required: [true, "Product price is required"] },
  weight: { type: String, required: [true, "Product weight is required"] },
  category: { type: Number, required: [true, "Product category is required"] },
  image: { type: String, required: [true, "Product image URL is required"] },
  ingredients: { type: [String], required: [true, "Product ingredients are required"] },
  nutritionalContent: {
    calories: { type: Number, required: [true, "Calories are required"] },
    fat: { type: String, required: [true, "Fat content is required"] },
    saturatedFat: { type: String, required: [true, "Saturated fat is required"] },
    cholesterol: { type: String, required: [true, "Cholesterol is required"] },
    sodium: { type: String, required: [true, "Sodium content is required"] },
    carbohydrates: { type: String, required: [true, "Carbohydrates are required"] },
    fiber: { type: String, required: [true, "Fiber content is required"] },
    sugar: { type: String, required: [true, "Sugar content is required"] },
    protein: { type: String, required: [true, "Protein content is required"] },
  },
});

module.exports = mongoose.model('Product', productSchema);
