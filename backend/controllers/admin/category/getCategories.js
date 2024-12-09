const Category = require("../../../models/categoryModel");
const getCategories = async (req, res) => {
    try {
      const categories = await Category.find({}, "id name");
      res.json({ success: true, categories });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  module.exports = { getCategories }