const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

const getCartItems = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: 'User ID is required.' });
    }

    const cartItems = await Cart.find({ userId })
      .populate('productId', 'name price image')
      .populate('userId', 'name email');

    res.status(200).json({
      success: true,
      cartItems,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

module.exports = { getCartItems };
