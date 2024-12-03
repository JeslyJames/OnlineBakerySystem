const Cart = require('../models/cartModel');

const addToCart = async (req, res) => {
  try {
    const { productId, userId, quantity } = req.body;

    // Validate input
    if (!productId || !userId || !quantity) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    // Check if the item is already in the cart for this user
    let cartItem = await Cart.findOne({ productId, userId });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = new Cart({ productId, userId, quantity });
      await cartItem.save();
    }

    res.status(201).json({
      success: true,
      message: 'Product added to cart successfully.',
      cartItem,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

module.exports = { addToCart };
