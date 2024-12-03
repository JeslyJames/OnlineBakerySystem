const Product = require("../models/productModel");

const fetchProducts = async (req, res) => {
  let products = await Product.find({});
  res.send(products);
};

const fetchProductById = async (req, res) => {
  const { productId } = req.body;
  let products = await Product.findOne({ _id: productId });
  if (products) {
    console.log("Product fetched");
    res.json({
      success: true,
      products,
    });
  } else {
    res.json({
      success: false,
      message: "Product not found!",
    });
  }
};

module.exports = { fetchProducts, fetchProductById }
