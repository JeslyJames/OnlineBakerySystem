const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: [true, "Name is required"] },
});

module.exports = mongoose.model('Category', categorySchema);
