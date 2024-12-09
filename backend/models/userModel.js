const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  role: { type: String, default: "Customer" },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
