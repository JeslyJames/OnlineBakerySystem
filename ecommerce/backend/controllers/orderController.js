const Order = require("../models/orderModel");

const createOrder = async (req, res) => {
  const {
    userId,
    products,
    totalAmount,
    shippingAddress,
    creditCard,
    cvv,
    expiryDate,
    phoneNumber,
  } = req.body;

  // Input validation using regex
  const cardRegex = /^[0-9]{16}$/;
  const cvvRegex = /^[0-9]{3,4}$/;
  const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
  const phoneRegex = /^[0-9]{10}$/;

  if (!userId || !products || !totalAmount || !shippingAddress) {
    return res.status(400).json({
      success: false,
      message: "Invalid order data. Missing required fields.",
    });
  }

  if (!creditCard || !cardRegex.test(creditCard)) {
    return res.status(400).json({
      success: false,
      message: "Invalid credit card number. It must be a 16-digit number.",
    });
  }

  if (!cvv || !cvvRegex.test(cvv)) {
    return res.status(400).json({
      success: false,
      message: "Invalid CVV. It must be a 3 or 4 digit number.",
    });
  }

  if (!expiryDate || !expiryRegex.test(expiryDate)) {
    return res.status(400).json({
      success: false,
      message: "Invalid expiry date. Use MM/YY format.",
    });
  }

  if (!phoneNumber || !phoneRegex.test(phoneNumber)) {
    return res.status(400).json({
      success: false,
      message: "Invalid phone number. It must be a 10-digit number.",
    });
  }

  try {
    const newOrder = new Order({
      userId,
      products,
      totalAmount,
      shippingAddress,
      phoneNumber,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({
      success: true,
      order: savedOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to place the order.",
      error: error.message,
    });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required." });
    }

    const orders = await Order.find({ userId }).populate("products.productId");

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching orders.",
      error: error.message,
    });
  }
};

module.exports = { createOrder, getUserOrders };
