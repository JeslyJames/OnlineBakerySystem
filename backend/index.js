const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { type } = require("os");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const adminCategoryRoutes = require("./routes/admin/categoryRoutes");
const adminProductRoutes = require("./routes/admin/productRoutes");
const adminUserRoutes = require("./routes/admin/userRoutes");

app.use(express.json());
app.use(cors());

app.use(express.json());

connectDB();

app.use('/', productRoutes);
app.use('/auth', authRoutes);
app.use('/admin/category', adminCategoryRoutes);
app.use('/admin/product', adminProductRoutes);
app.use('/admin/user', adminUserRoutes);

//API creation
app.get("/", (req, res) => {
  res.send("Express App is running");
});

app.listen(4000, () => {
  console.log("Application Link: http://localhost:4000/");
})