const Category = require("../models/categoryModel");
const Product = require("../models/productModel");

const fetchCategories = async (req, res) => {
  let categories = await Category.find({});
  res.send(categories);
};

const fetchProductsByCategoryId = async (req, res) => {
  const { categoryId } = req.body;
  console.log(categoryId === 2);
  
  let products = await Product.find({ category: categoryId });
  console.log(products);
  
  if (products.length > 0) {
    console.log("Products fetched");
    res.json({
      success: true,
      products,
    });
  } else {
    res.json({
      success: false,
      message: "Products not found!",
    });
  }
};

module.exports = { fetchCategories, fetchProductsByCategoryId }
