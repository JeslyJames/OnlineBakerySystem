const Product = require("../../../models/productModel");
const addProduct = async (req, res) => {
    try {
      const lastProduct = await Product.findOne().sort({ id: -1 });
      const newId = lastProduct ? lastProduct.id + 1 : 1;

      const newProduct = new Product({
        id: newId,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        weight: req.body.weight,
        category: req.body.category,
        image: req.body.image,
        ingredients: req.body.ingredients,
        nutritionalContent: req.body.nutritionalContent,
      });

      await newProduct.save();
      res.json({
        success: true,
        message: "Product created successfully",
        product: newProduct,
      });
    } catch (error) {
      // Handle validation errors
      if (error.name === "ValidationError") {
        const errors = Object.values(error.errors).map((err) => err.message);
        return res.status(400).json({ success: false, message: errors });
      }
      res.status(500).json({ success: false, message: error.message });
    }
  }

  module.exports = { addProduct }