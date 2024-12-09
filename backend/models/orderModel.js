const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  totalAmount: { type: Number, required: true },
  shippingAddress: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  paymentIntentId: { type: String },
  paymentStatus: { type: String, default: "Pending" },
  postalCode: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
