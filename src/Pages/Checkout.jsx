import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Button,
} from "@mui/material";
import { UserContext } from "../Components/UserContext";

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [shippingAddress, setShippingAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (state && state.productId) {
      const total = state.price * state.quantity;
      setCartItems([state]);
      setTotalAmount(total);
    } else {
      fetchCartItems();
    }
  }, [state, user]);

  const fetchCartItems = async () => {
    try {
      const response = await fetch("http://localhost:4000/cart-items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id }),
      });

      const data = await response.json();
      if (response.ok && data.cartItems.length > 0) {
        setCartItems(data.cartItems);

        const total = data.cartItems.reduce(
          (sum, item) => sum + item.productId.price * item.quantity,
          0
        );
        setTotalAmount(total);
      } else {
        navigate("/cart");
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const validateInputs = () => {
    const newErrors = {};
    const phoneRegex = /^[0-9]{10}$/; // 10-digit phone number
    const postalCodeRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/; // Canadian postal code

    if (!phoneNumber || !phoneRegex.test(phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number (10 digits required).";
    }
    if (!shippingAddress.trim()) {
      newErrors.shippingAddress = "Shipping address is required.";
    }
    if (!postalCode || !postalCodeRegex.test(postalCode)) {
      newErrors.postalCode = "Invalid Canadian postal code format.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProceedToPayment = () => {
    if (!validateInputs()) {
      return;
    }

    // Redirect to the Payment Page with necessary state
    navigate("/payment", {
      state: {
        userId: user.id,
        cartItems,
        totalAmount,
        shippingAddress,
        phoneNumber,
        postalCode,
      },
    });
  };

  return (
    <Box className="p-6 bg-gray-100 rounded-lg shadow-md max-w-7xl mx-auto">
      <Typography
        variant="h4"
        className="text-center mb-6 font-semibold text-gray-700"
      >
        Checkout
      </Typography>

      <Box display="flex" flexDirection="column" mb={4} gap={2}>
        <TextField label="Name" value={user?.name || ""} disabled fullWidth />
        <TextField label="Email" value={user?.email || ""} disabled fullWidth />
        <TextField
          label="Shipping Address"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
          fullWidth
          error={!!errors.shippingAddress}
          helperText={errors.shippingAddress}
        />
        <TextField
          label="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          fullWidth
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber}
        />
        <TextField
          label="Postal Code"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          fullWidth
          error={!!errors.postalCode}
          helperText={errors.postalCode}
        />
      </Box>

      {cartItems.map((item) => (
        <Card
          key={item.productId._id || item.productId}
          className="checkout-card"
          sx={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}
        >
          <CardMedia
            component="img"
            image={item.productId?.image || item.image}
            alt={item.productId?.name || item.name}
            sx={{ width: 100, height: 100 }}
          />
          <CardContent>
            <Typography variant="h5">
              {item.productId?.name || item.name}
            </Typography>
            <Typography variant="body1">Quantity: {item.quantity}</Typography>
            <Typography variant="body1">
              Price: ${item.productId?.price || item.price}
            </Typography>
            <Typography variant="body1">
              Subtotal: ${(item.productId?.price || item.price) * item.quantity}
            </Typography>
          </CardContent>
        </Card>
      ))}

      <Typography variant="h5" className="mt-4 text-right">
        Total: ${totalAmount.toFixed(2)}
      </Typography>

      <Box className="mt-6 flex justify-end">
        <Button
          variant="contained"
          color="primary"
          onClick={handleProceedToPayment}
        >
          Proceed to Payment
        </Button>
      </Box>
    </Box>
  );
};

export default Checkout;
