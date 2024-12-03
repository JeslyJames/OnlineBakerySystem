const Product = require("../../../models/productModel");
const updateProduct = async (req, res) => {
    try {
      const updatedProduct = await Product.findOneAndUpdate(
        { _id: req.params.id },
        {
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          weight: req.body.weight,
          category: req.body.category,
          image: req.body.image,
          ingredients: req.body.ingredients,
          nutritionalContent: req.body.nutritionalContent,
        },
        { new: true, runValidators: true } // Ensure validations run on update
      );
      if (!updatedProduct) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }
      res.json({
        success: true,
        message: "Product updated successfully",
        product: updatedProduct,
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

module.exports = { updateProduct }  