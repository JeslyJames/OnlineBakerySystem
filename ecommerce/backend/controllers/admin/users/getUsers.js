const Users = require("../../../models/userModel");

const getUsers = async (req, res) => {
  try {
    const users = await Users.find({}, "id name email role");
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getUsers };
