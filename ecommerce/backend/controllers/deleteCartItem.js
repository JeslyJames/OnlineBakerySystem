const Cart = require("../models/cartModel");

const deleteCartItem = async (req, res) => {
  const { cartItemId } = req.params;

  try {
    await Cart.findByIdAndDelete(cartItemId);
    res.status(200).json({ success: true, message: "Cart item removed." });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to remove cart item.", error });
  }
};

const deleteCart = async (req, res) => {
    const { userId } = req.params;
  
    try {
      await Cart.deleteMany({ userId });
      res.status(200).json({ success: true, message: 'Cart cleared successfully.' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to clear cart.', error });
    }
  }

module.exports = { deleteCartItem, deleteCart };
