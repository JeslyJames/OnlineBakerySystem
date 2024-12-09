const Category = require("../../../models/categoryModel");
const deleteCategory = async (req, res) => {
  try {
    const result = await Category.findOneAndDelete({ id: req.params.id });
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    res.json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { deleteCategory }