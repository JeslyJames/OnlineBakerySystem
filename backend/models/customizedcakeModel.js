const mongoose = require('mongoose');

const CustomizedCakeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  },
  phone: {
    type: String,
    required: true,
    match: /^\+?[0-9\s-]{10,15}$/,
  },
  date: {
    type: Date,
    required: true,
  },
  cakeShape: {
    type: String,
    required: true,
    enum: ['Round', 'Square', 'Heart'],
  },
  spongeFlavor: {
    type: String,
    required: true,
    enum: ['Chocolate', 'Vanilla', 'Red Velvet'],
  },
  filling: {
    type: String,
    required: true,
    enum: ['Fresh Cream', 'Chocolate Ganache', 'Buttercream'],
  },
  eggFree: {
    type: Boolean,
    required: true,
  },
  file: {
    type: String,
    required: false, // Assuming file upload is optional
  },
  message: {
    type: String,
    required: false,
  },
  promotionalOffers: {
    type: Boolean,
    required: true,
  },
}, { timestamps: true });

const CustomizedCake = mongoose.model('CustomizedCake', CustomizedCakeSchema);

module.exports = CustomizedCake;
