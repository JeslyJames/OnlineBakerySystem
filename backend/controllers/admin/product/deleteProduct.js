const Product = require("../../../models/productModel");
const deleteProduct = async (req, res) => {
  try {
    const result = await Product.findOneAndDelete({ _id: req.params.id });
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
module.exports = { deleteProduct };
