// routes/productRoutes.js

const express = require('express');
const Product = require('../models/Product');  // Import Product model
const router = express.Router();

// Route to add a new product
router.post('/addProduct', async (req, res) => {
  const { name, description, price, category, image } = req.body;

  try {
    const newProduct = new Product({ name, description, price, category, image });
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error adding product', error });
  }
});

// Route to get all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
});

// Route to get products by category
router.get('/products/:category', async (req, res) => {
  const { category } = req.params;

  try {
    const products = await Product.find({ category });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products by category', error });
  }
});

module.exports = router;
