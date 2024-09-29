const mongoose = require('mongoose');

// Category Schema
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'  // Reference to the Product model
  }]
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
