import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  Button,
  CircularProgress,
  TextField,
} from "@mui/material";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const PaymentPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [billingEmail, setBillingEmail] = useState("");
  const [orderId, setOrderId] = useState(""); // Store the generated orderId

  const handlePayment = async () => {
    if (!stripe || !elements) {
      return; // Stripe not initialized yet
    }

    if (!nameOnCard.trim() || !billingEmail.trim()) {
      setError("Please fill in all the required fields.");
      return;
    }

    setProcessing(true);
    setError("");

    try {
      // Step 1: Create the order
      const createdOrder = await createOrder();
      if (!createdOrder) {
        setError("Failed to create order. Please try again.");
        setProcessing(false);
        return;
      }

      // Step 2: Create payment intent
      const response = await fetch("http://localhost:4000/payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ totalAmount: state.totalAmount }),
      });

      const { clientSecret } = await response.json();

      // Step 3: Confirm payment
      const cardElement = elements.getElement(CardElement);
      const { paymentIntent, error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: nameOnCard,
            email: billingEmail,
          },
        },
      });

      if (stripeError) {
        setError(stripeError.message);
        setProcessing(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        // Step 4: Confirm the order payment in backend
        await confirmOrderPayment(paymentIntent.id, createdOrder._id);
      }
    } catch (err) {
      setError("Payment failed. Please try again.");
      console.error(err);
      setProcessing(false);
    }
  };

  const createOrder = async () => {
    try {
      const response = await fetch("http://localhost:4000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: state.userId,
          products: state.cartItems.map((item) => ({
            productId: item.productId._id || item.productId,
            name: item.productId.name || item.name,
            price: item.productId.price || item.price,
            quantity: item.quantity,
          })),
          totalAmount: state.totalAmount,
          shippingAddress: state.shippingAddress,
          postalCode: state.postalCode,
          phoneNumber: state.phoneNumber,
        }),
      });

      const data = await response.json();
      console.log(data);
      
      if (response.ok) {
        setOrderId(data.order._id); // Store the created order ID
        return data.order;
      } else {
        console.error("Order creation failed:", data.message);
        return null;
      }
    } catch (err) {
      console.error("Error creating order:", err);
      return null;
    }
  };

  const confirmOrderPayment = async (paymentIntentId, orderId) => {
    try {
      const response = await fetch("http://localhost:4000/confirm-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentIntentId,
          orderId, // Pass the created order ID
        }),
      });

      const data = await response.json();
      if (response.ok) {
        navigate("/success", { state: { order: data.order } });
      } else {
        setError("Failed to update order. Please contact support.");
      }
    } catch (err) {
      console.error("Error confirming order payment:", err);
      setError("Error confirming order payment. Please contact support.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Box className="p-6 bg-gray-100 rounded-lg shadow-md max-w-7xl mx-auto">
      <Typography
        variant="h4"
        className="text-center mb-6 font-semibold text-gray-700"
      >
        Payment
      </Typography>

      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handlePayment();
        }}
        display="flex"
        flexDirection="column"
        gap={3}
      >
        <TextField
          label="Name on Card"
          value={nameOnCard}
          onChange={(e) => setNameOnCard(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Billing Email"
          type="email"
          value={billingEmail}
          onChange={(e) => setBillingEmail(e.target.value)}
          fullWidth
          required
        />
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": { color: "#aab7c4" },
              },
              invalid: { color: "#9e2146" },
            },
          }}
        />

        {error && (
          <Typography variant="body2" color="error" className="mt-2">
            {error}
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!stripe || processing}
        >
          {processing ? <CircularProgress size={24} /> : "Pay Now"}
        </Button>
      </Box>
    </Box>
  );
};

export default PaymentPage;
