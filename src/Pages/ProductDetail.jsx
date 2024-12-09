import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import { Button, Box, Typography, Card } from "@mui/material";
import { UserContext } from "../Components/UserContext";

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:4000/getProductById`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId }),
        });

        const data = await response.json();
        if (data.success) {
          setProduct(data.products);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError("Error fetching product details");
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = async () => {
    if (!user || !user.id) {
      alert("Please log in to add items to the cart.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          productId: productId,
          quantity: 1,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Item added to cart successfully!");
        navigate("/cart");
      } else {
        alert(`Failed to add item to cart: ${data.message}`);
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleBuyNow = () => {
    if (!user || !user.id) {
      alert("Please log in to proceed with the purchase.");
      return;
    }

    navigate("/checkout", {
      state: {
        productId,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      },
    });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", padding: 3, backgroundColor: "#f9f9f9" }}
    >
      {error ? (
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      ) : product ? (
        <Card
          sx={{
            maxWidth: 700,
            width: "100%",
            margin: "0 auto",
            padding: 3,
            boxShadow: 3,
            borderRadius: 2,
          }}
        >
          <ProductDisplay product={product} />

          <Box
            display="flex"
            justifyContent="center"
            gap={2}
            mt={3}
            flexWrap="wrap"
          >
            <Button
              variant="contained"
              color="primary"
              size="medium"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="medium"
              onClick={handleBuyNow}
            >
              Buy Now
            </Button>
          </Box>
        </Card>
      ) : (
        <Typography variant="body1" color="text.secondary">
          Loading product details...
        </Typography>
      )}

      <Button
        variant="contained"
        color="error"
        sx={{
          marginTop: 4,
          fontWeight: "bold",
          backgroundColor: "#D5006D",
        }}
        onClick={() => navigate(-1)}
      >
        Back to Products
      </Button>
    </Box>
  );
};

export default ProductDetail;
