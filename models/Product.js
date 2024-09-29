// models/Product.js

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  weight: { type: String },  // Optional field for product weight
  category: { type: String, required: true },  // e.g., Cakes, Cupcakes
  image: { type: String }  // Image URL for the product
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

