import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Modal,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import "./AdminPanel.css"; // You can remove this if not needed anymore

const Products = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    weight: "",
    category: "",
    image: "",
    ingredients: "",
    nutritionalContent: {
      calories: "",
      fat: "",
      saturatedFat: "",
      cholesterol: "",
      sodium: "",
      carbohydrates: "",
      fiber: "",
      sugar: "",
      protein: "",
    },
  });
  const token = localStorage.getItem("auth-token");
  const [editProduct, setEditProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch products from the backend
  const fetchProducts = async () => {
    const response = await fetch("http://localhost:4000/admin/product", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (data.success) setProducts(data.products);
  };

  // Handle input changes for adding a new product
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name in newProduct.nutritionalContent) {
      setNewProduct({
        ...newProduct,
        nutritionalContent: {
          ...newProduct.nutritionalContent,
          [name]: value,
        },
      });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  // Add a new product
  const handleAddProduct = async () => {
    setErrors([]);
    const productData = {
      ...newProduct,
      price: parseFloat(newProduct.price),
      nutritionalContent: {
        ...newProduct.nutritionalContent,
        calories: parseFloat(newProduct.nutritionalContent.calories),
      },
      ingredients: newProduct.ingredients
        .split(",")
        .map((ing) => ing.trim()),
    };

    try {
      const response = await fetch("http://localhost:4000/admin/product", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });
      const data = await response.json();

      if (data.success) {
        setNewProduct({
          name: "",
          description: "",
          price: "",
          weight: "",
          category: "",
          image: "",
          ingredients: "",
          nutritionalContent: {
            calories: "",
            fat: "",
            saturatedFat: "",
            cholesterol: "",
            sodium: "",
            carbohydrates: "",
            fiber: "",
            sugar: "",
            protein: "",
          },
        });
        fetchProducts();
      } else {
        setErrors(data.message); // Display validation errors
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // Handle input changes for editing a product
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    if (name in editProduct.nutritionalContent) {
      setEditProduct({
        ...editProduct,
        nutritionalContent: {
          ...editProduct.nutritionalContent,
          [name]: value,
        },
      });
    } else {
      setEditProduct({ ...editProduct, [name]: value });
    }
  };

  // Edit a product
  const handleEditProduct = async () => {
    setErrors([]);
    const productData = {
      ...editProduct,
      price: parseFloat(editProduct.price),
      nutritionalContent: {
        ...editProduct.nutritionalContent,
        calories: parseFloat(editProduct.nutritionalContent.calories),
      },
      ingredients: editProduct.ingredients
        .split(",")
        .map((ing) => ing.trim()),
    };

    try {
      const response = await fetch(
        `http://localhost:4000/admin/product/${editProduct._id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(productData),
        }
      );
      const data = await response.json();

      if (data.success) {
        fetchProducts();
        setShowModal(false);
      } else {
        setErrors(data.message); // Display validation errors
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Delete a product
  const handleDeleteProduct = async (id) => {
    await fetch(`http://localhost:4000/admin/product/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    fetchProducts();
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-7xl mx-auto">
      <Typography
        variant="h4"
        className="text-center mb-6 font-semibold text-gray-700"
      >
        Products Management
      </Typography>

      {errors.length > 0 && (
        <div className="error-messages mb-4">
          {errors.map((err, idx) => (
            <Typography key={idx} color="error">
              {err}
            </Typography>
          ))}
        </div>
      )}

      {/* Add New Product Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <Typography variant="h5" className="mb-4 font-medium text-gray-700">
          Add New Product
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField
            label="Name"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Price"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            type="number"
            fullWidth
          />
          <TextField
            label="Weight"
            name="weight"
            value={newProduct.weight}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Category"
            name="category"
            value={newProduct.category}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Image URL"
            name="image"
            value={newProduct.image}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Ingredients (comma separated)"
            name="ingredients"
            value={newProduct.ingredients}
            onChange={handleInputChange}
            fullWidth
            multiline
          />
          <TextField
            label="Description"
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
            multiline
            rows={3}
            fullWidth
            className="md:col-span-2"
          />

          <Typography
            variant="h6"
            className="col-span-full mt-4 text-gray-600"
          >
            Nutritional Content
          </Typography>

          {/* Nutritional Content Fields */}
          {Object.keys(newProduct.nutritionalContent).map((key) => (
            <TextField
              key={key}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              name={key}
              value={newProduct.nutritionalContent[key]}
              onChange={handleInputChange}
              fullWidth
            />
          ))}

          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleAddProduct}
            className="col-span-full mt-4"
          >
            Add Product
          </Button>
        </div>
      </div>

      {/* Product List */}
      <div>
        <Typography variant="h5" className="mb-4 font-medium text-gray-700">
          Product List
        </Typography>
        <div className="grid grid-cols-1 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex justify-between items-start">
                <div>
                  <Typography variant="h6" className="font-semibold mb-2">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" className="text-gray-600 mb-1">
                    {product.description}
                  </Typography>
                  <Typography variant="body2" className="text-gray-600 mb-1">
                    Price: ${product.price} | Weight: {product.weight}
                  </Typography>
                  <Typography variant="body2" className="text-gray-600 mb-1">
                    Category: {product.category}
                  </Typography>
                  <Typography variant="body2" className="text-gray-600 mb-1">
                    Ingredients:{" "}
                    {product.ingredients && product.ingredients.join(", ")}
                  </Typography>
                  <Typography variant="body2" className="text-gray-600 mt-2">
                    <strong>Nutritional Content:</strong>
                  </Typography>
                  <ul className="list-disc list-inside text-gray-600">
                    {Object.entries(product.nutritionalContent || {}).map(
                      ([key, value]) => (
                        <li key={key}>
                          {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <div className="flex flex-col space-y-2">
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setEditProduct({
                        ...product,
                        ingredients: product.ingredients.join(", "),
                      });
                      setShowModal(true);
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    <Delete />
                  </IconButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Product Modal */}
      {showModal && editProduct && (
        <Modal open={showModal} onClose={() => setShowModal(false)}>
          <Box className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto mt-10 overflow-y-auto max-h-screen">
            <Typography variant="h5" className="mb-4">
              Edit Product
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextField
                label="Name"
                name="name"
                value={editProduct.name}
                onChange={handleEditInputChange}
                fullWidth
              />
              <TextField
                label="Price"
                name="price"
                value={editProduct.price}
                onChange={handleEditInputChange}
                type="number"
                fullWidth
              />
              <TextField
                label="Weight"
                name="weight"
                value={editProduct.weight}
                onChange={handleEditInputChange}
                fullWidth
              />
              <TextField
                label="Category"
                name="category"
                value={editProduct.category}
                onChange={handleEditInputChange}
                fullWidth
              />
              <TextField
                label="Image URL"
                name="image"
                value={editProduct.image}
                onChange={handleEditInputChange}
                fullWidth
              />
              <TextField
                label="Ingredients (comma separated)"
                name="ingredients"
                value={editProduct.ingredients}
                onChange={handleEditInputChange}
                fullWidth
                multiline
              />
              <TextField
                label="Description"
                name="description"
                value={editProduct.description}
                onChange={handleEditInputChange}
                multiline
                rows={3}
                fullWidth
                className="md:col-span-2"
              />

              <Typography
                variant="h6"
                className="col-span-full mt-4 text-gray-600"
              >
                Nutritional Content
              </Typography>

              {/* Nutritional Content Fields */}
              {Object.keys(editProduct.nutritionalContent).map((key) => (
                <TextField
                  key={key}
                  label={key.charAt(0).toUpperCase() + key.slice(1)}
                  name={key}
                  value={editProduct.nutritionalContent[key]}
                  onChange={handleEditInputChange}
                  fullWidth
                />
              ))}

              {errors.length > 0 && (
                <div className="error-messages col-span-full">
                  {errors.map((err, idx) => (
                    <Typography key={idx} color="error">
                      {err}
                    </Typography>
                  ))}
                </div>
              )}

              <div className="flex space-x-2 col-span-full mt-4">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleEditProduct}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default Products;
