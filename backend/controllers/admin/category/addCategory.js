const Category = require("../../../models/categoryModel");
const addCategory = async (req, res) => {
    try {
      const lastCategory = await Category.findOne().sort({ id: -1 });
      const newId = lastCategory ? lastCategory.id + 1 : 1;

      const category = new Category({
        id: newId,
        name: req.body.name,
      });
      await category.save();
      res.json({
        success: true,
        message: "Category created successfully",
        category,
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

  module.exports = { addCategory }