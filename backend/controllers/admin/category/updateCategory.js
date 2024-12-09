const Category = require("../../../models/categoryModel");
const updateCategory = async (req, res) => {
  try {
    const category = await Category.findOneAndUpdate(
      { id: req.params.id },
      { name: req.body.name },
      { new: true }
    );
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    res.json({
      success: true,
      message: "Category updated successfully",
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
};

module.exports = { updateCategory };
