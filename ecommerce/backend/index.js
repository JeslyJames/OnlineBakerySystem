const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { type } = require("os");

app.use(express.json());
app.use(cors());

//Database connection
mongoose.connect(
  "mongodb+srv://jeslyjames5:Kallimel123@cluster0.q5ih4qe.mongodb.net/bakeryDB"
);

//API creation
app.get("/", (req, res) => {
  res.send("Express App is running");
});

//Creating schema product
// Product model
const Product = mongoose.model("Product", {
  name: {
    type: String,
    required: [true, "Product name is required"],
  },
  description: {
    type: String,
    required: [true, "Product description is required"],
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
  },
  weight: {
    type: String,
    required: [true, "Product weight is required"],
  },
  category: {
    type: String,
    required: [true, "Product category is required"],
  },
  image: {
    type: String,
    required: [true, "Product image URL is required"],
  },
  ingredients: {
    type: [String],
    required: [true, "Product ingredients are required"],
  },
  nutritionalContent: {
    calories: { type: Number, required: [true, "Calories are required"] },
    fat: { type: String, required: [true, "Fat content is required"] },
    saturatedFat: {
      type: String,
      required: [true, "Saturated fat is required"],
    },
    cholesterol: { type: String, required: [true, "Cholesterol is required"] },
    sodium: { type: String, required: [true, "Sodium content is required"] },
    carbohydrates: {
      type: String,
      required: [true, "Carbohydrates are required"],
    },
    fiber: { type: String, required: [true, "Fiber content is required"] },
    sugar: { type: String, required: [true, "Sugar content is required"] },
    protein: { type: String, required: [true, "Protein content is required"] },
  },
});

app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }
  const product = new product({
    id: id,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
    category: req.body.category,
    stock: req.body.stock,
  });
  console.log(product);
  await product.save();
  console.log("saved");
  res.json({
    succes: true,
    name: req.body.name,
  });
});
//Creating API to get products
app.get("/allProducts", async (req, res) => {
  let products = await Product.find({});
  console.log("All product fetched", products);
  res.send(products);
});

app.post("/getProductById", async (req, res) => {
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
});

//Creating api to store user
const Users = mongoose.model("Users", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    default: "Customer",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
//creating endpoint for user
const bcrypt = require("bcrypt");
const saltRounds = 10;

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Required field validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        errors: "All fields are required: name, email, and password.",
      });
    }

    // Regex Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[a-zA-Z\s]+$/; // Allowing only alphabets and spaces
    if (!nameRegex.test(name)) {
      return res
        .status(400)
        .json({ success: false, errors: "Invalid name format." });
    }
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, errors: "Invalid email format." });
    }
    if (password.length !== 8) {
      return res.status(400).json({
        success: false,
        errors: "Password must be exactly 8 characters long.",
      });
    }

    // Check for existing user
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        errors: "Account Already Exists. Please Log In.",
      });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create and save new user
    const user = new Users({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();

    const data = {
      user: {
        id: user.id,
        role: user.role,
      },
    };
    const token = jwt.sign(data, "secret_ecom");
    res.json({ success: true, token, role: user.role });
  } catch (error) {
    res.status(400).json({
      success: false,
      errors: error.response?.data?.message || error.message,
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, errors: "Email and password are required." });
    }

    const user = await Users.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, errors: "User not found." });
    }

    const passCompare = await bcrypt.compare(password, user.password);
    if (!passCompare) {
      return res
        .status(400)
        .json({ success: false, errors: "Invalid Password." });
    }

    const data = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };

    const token = jwt.sign(data, "secret_ecom", { expiresIn: "1h" });
    res.json({ success: true, token, user });
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        errors: error.response?.data?.message || error.message,
      });
  }
});

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  console.log(token);

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Access Denied. No token provided." });
  }

  try {
    const verified = jwt.verify(token, "secret_ecom");
    req.user = verified.user; // Attach user data to request
    next(); // Pass control to the next middleware or route handler
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid Token" });
  }
};

const adminMiddleware = (req, res, next) => {
  // Check if the authenticated user has the Admin role
  if (req.user.role !== "Admin") {
    return res
      .status(403)
      .json({ success: false, message: "Access denied. Admins only." });
  }
  next(); // Pass control to the route handler if the user is an Admin
};

app.listen(port, (error) => {
  if (!error) {
    console.log("Server Running on Port " + port);
  } else {
    console.log("Error: " + error);
  }
});

const Category = mongoose.model("Categories", {
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
});

// category

// Create Category
app.post(
  "/admin/categories",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
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
);

// Get All Categories
app.get(
  "/admin/categories",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const categories = await Category.find({}, "id name");
      res.json({ success: true, categories });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// Update Category
app.put(
  "/admin/categories/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
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
  }
);

// Delete Category
app.delete(
  "/admin/categories/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
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
  }
);

// products

// Create Product
// Create Product
app.post(
  "/admin/products",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
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
);

// Get All Products
app.get(
  "/admin/products",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const products = await Product.find({});
      res.json({ success: true, products });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// Update Product
// Update Product
app.put(
  "/admin/products/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
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
);

// Delete Product
app.delete(
  "/admin/products/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
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
  }
);

// users

// Get All Users (Admin only)
app.get("/admin/users", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await Users.find({}, "id name email role");
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
