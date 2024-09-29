// routes/categoryRoutes.js

const express = require('express');
const Category = require('../models/Category');
const router = express.Router();

// Route to add a new category
router.post('/addCategory', async (req, res) => {
  const { name } = req.body;

  try {
    const category = new Category({ name });
    const savedCategory = await category.save();
    res.status(200).json(savedCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error adding category', error });
  }
});

module.exports = router;
