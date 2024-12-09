import React, { useContext } from "react";
import "./Item.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { Button, Box } from "@mui/material";

const Item = (props) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

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
          productId: props.ID,
          quantity: 1,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Item added to cart successfully!");
        navigate("/cart"); // Navigate to the cart page after adding to cart
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
        productId: props.ID || props.id,
        name: props.name,
        price: props.price || props.new_price,
        image: props.image,
        quantity: 1,
      },
    });
  };

  return (
    <div className="Item item">
      <Link to={`/productDetail/${props.ID}`}>
        <img src={props.image || '/images/birthday-cake.jpg'} alt={`${props.name} Image`} />
        <h3>{props.name}</h3>
        <p>{props.desc || 'No Description'}</p>
        <p>${props.price || props.new_price}</p>
      </Link>
      <Box className="button-group" display="flex" gap={1} mt={1}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddToCart}
          size="small"
        >
          Add to Cart
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleBuyNow}
          size="small"
        >
          Buy Now
        </Button>
      </Box>
    </div>
  );
};

export default Item;
