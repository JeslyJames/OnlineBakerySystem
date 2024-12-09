import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Typography, Box, Button, Card, CardContent } from "@mui/material";

const SuccessPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { order } = state || {};

  if (!order) {
    return (
      <Box className="p-6 bg-gray-100 rounded-lg shadow-md max-w-7xl mx-auto text-center">
        <Typography variant="h4" gutterBottom>
          Something went wrong!
        </Typography>
        <Typography variant="body1" gutterBottom>
          We couldn't retrieve your order details. Please contact support if this issue persists.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
        >
          Go to Home
        </Button>
      </Box>
    );
  }

  return (
    <Box className="p-6 bg-gray-100 rounded-lg shadow-md max-w-7xl mx-auto text-center">
      <Typography variant="h4" gutterBottom>
        Thank You for Your Order!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Your order has been placed successfully. Below are the details:
      </Typography>

      <Box className="mt-4">
        <Card className="success-card">
          <CardContent>
            <Typography variant="h6">Order ID: {order._id}</Typography>
            <Typography variant="body1">
              Total Amount: ${order.totalAmount.toFixed(2)}
            </Typography>
            <Typography variant="body1">
              Shipping Address: {order.shippingAddress}
            </Typography>
            <Typography variant="body1">
              Phone Number: {order.phoneNumber}
            </Typography>
          </CardContent>
        </Card>

        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Ordered Products:
          </Typography>
          {order.products.map((product, index) => (
            <Card key={index} className="success-product-card" sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="body1">
                  {product.name} (x{product.quantity})
                </Typography>
                <Typography variant="body2">
                  Price: ${product.price.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      <Box mt={4}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
        >
          Go to Home
        </Button>
      </Box>
    </Box>
  );
};

export default SuccessPage;
