const CustomizedCake = require("../../../models/customizedcakeModel");
const getCustomizedCakes = async (req, res) => {
    try {
      const products = await CustomizedCake.find({});
      res.json({ success: true, products });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  module.exports = { getCustomizedCakes }