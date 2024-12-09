const jwt = require("jsonwebtoken");
const Users = require("../../models/userModel");
const bcrypt = require("bcrypt");
const registerController = async (req, res) => {
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

    const saltRounds = 10;
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
};

module.exports = { registerController }