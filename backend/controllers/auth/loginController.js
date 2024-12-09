const Users = require("../../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const loginController = async (req, res) => {
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
    res.json({ success: true, token, user: data.user });
  } catch (error) {
    res.status(400).json({
      success: false,
      errors: error.response?.data?.message || error.message,
    });
  }
};

module.exports = { loginController }
