const Order = require("../models/orderModel");
const Stripe = require("stripe");

// Initialize Stripe with your secret key
const stripe = Stripe("sk_test_51QRfhALB7kIWN36jZZSJ4iGtTUvROgETJSIODw58iCBetPL2ggnZZMhJIfjBUteZfftIxc53ojA790XTxpW1kwWy00bcltqS3w"); // Replace with your actual Stripe Secret Key

/**
 * Create an order after successful payment
 */
const createOrder = async (req, res) => {
  const { userId, products, totalAmount, shippingAddress, phoneNumber, postalCode } = req.body;

  if (!userId || !products || !totalAmount || !shippingAddress || !postalCode) {
    return res.status(400).json({
      success: false,
      message: "Invalid order data. Missing required fields.",
    });
  }

  if (!phoneNumber || !/^[0-9]{10}$/.test(phoneNumber)) {
    return res.status(400).json({
      success: false,
      message: "Invalid phone number. It must be a 10-digit number.",
    });
  }

  try {
    // Create the order after successful payment
    const newOrder = new Order({
      userId,
      products,
      totalAmount,
      shippingAddress,
      phoneNumber,
      postalCode,
      paymentStatus: "Pending", // Initial status before payment confirmation
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({
      success: true,
      order: savedOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create the order.",
      error: error.message,
    });
  }
};

/**
 * Create a payment intent for Stripe
 */
const createPaymentIntent = async (req, res) => {
  const { totalAmount } = req.body;

  if (!totalAmount || typeof totalAmount !== "number") {
    return res.status(400).json({
      success: false,
      message: "Invalid total amount.",
    });
  }

  try {
    // Create a Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // Convert to smallest currency unit
      currency: "usd", // Change this if required
      payment_method_types: ["card"], // Enable card payments
    });

    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret, // Return client secret for frontend
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create payment intent.",
      error: error.message,
    });
  }
};

/**
 * Confirm order payment after successful Stripe payment
 */
const confirmOrderPayment = async (req, res) => {
  const { paymentIntentId, orderId } = req.body;

  if (!paymentIntentId || !orderId) {
    return res.status(400).json({
      success: false,
      message: "Missing paymentIntentId or orderId.",
    });
  }

  try {
    // Retrieve the payment intent to check its status
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === "succeeded") {
      // Update the order status to Paid
      const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        { paymentStatus: "Paid" },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        order: updatedOrder,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Payment was not successful.",
      });
    }
  } catch (error) {
    console.error("Error confirming payment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to confirm payment.",
      error: error.message,
    });
  }
};

/**
 * Fetch user orders
 */
const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required.",
      });
    }

    const orders = await Order.find({ userId }).populate("products.productId");

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders.",
      error: error.message,
    });
  }
};

module.exports = { createOrder, createPaymentIntent, confirmOrderPayment, getUserOrders };
