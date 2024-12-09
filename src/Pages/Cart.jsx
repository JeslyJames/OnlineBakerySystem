import React, { useEffect, useState, useContext } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { UserContext } from "../Components/UserContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, [user]);

  const fetchCartItems = async () => {
    try {
      if (user && Object.keys(user).length > 0) {
        const response = await fetch("http://localhost:4000/cart-items", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user.id }),
        });
        const data = await response.json();
        if (response.ok) {
          setCartItems(data.cartItems);
        } else {
          alert(`Failed to fetch cart items: ${data.message}`);
        }
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
      alert("An error occurred while fetching cart items.");
    }
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const updateQuantity = async (productId, quantityChange) => {
    try {
      const response = await fetch("http://localhost:4000/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          userId: user.id,
          quantity: quantityChange,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.productId._id === productId
              ? { ...item, quantity: item.quantity + quantityChange }
              : item
          )
        );
      } else {
        alert(`Failed to update quantity: ${data.message}`);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      alert("An error occurred while updating the quantity.");
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    try {
      const response = await fetch(`http://localhost:4000/cart/${cartItemId}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (response.ok) {
        setCartItems((prevItems) =>
          prevItems.filter((item) => item._id !== cartItemId)
        );
        alert("Item removed successfully!");
      } else {
        alert(`Failed to remove item: ${data.message}`);
      }
    } catch (error) {
      console.error("Error removing item:", error);
      alert("An error occurred while removing the item.");
    }
  };

  return (
    <Box className="p-6 bg-gray-100 rounded-lg shadow-md max-w-7xl mx-auto">
      <Typography
        variant="h4"
        className="text-center mb-4 font-semibold text-gray-700"
      >
        Your Cart
      </Typography>
      <TableContainer component={Paper} className="shadow-md">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle1" className="font-bold">
                  Product
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" className="font-bold">
                  Price
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" className="font-bold">
                  Quantity
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" className="font-bold">
                  Total
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" className="font-bold">
                  Actions
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.productId.name}</TableCell>
                  <TableCell>${item.productId.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() =>
                        item.quantity > 1 &&
                        updateQuantity(item.productId._id, -1)
                      }
                    >
                      <RemoveIcon />
                    </IconButton>
                    {item.quantity}
                    <IconButton
                      color="primary"
                      onClick={() => updateQuantity(item.productId._id, 1)}
                    >
                      <AddIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    ${(item.productId.price * item.quantity).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="secondary"
                      onClick={() => handleRemoveItem(item._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography variant="body1">Your cart is empty.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box className="mt-6 flex justify-end">
        <Typography variant="h5" className="font-bold m-3">
          Total: $
          {cartItems
            .reduce(
              (total, item) => total + item.productId.price * item.quantity,
              0
            )
            .toFixed(2)}
        </Typography>
        {cartItems && cartItems.length > 0 && (
          <Button variant="contained" onClick={handleCheckout} color="primary">
            Checkout
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Cart;
