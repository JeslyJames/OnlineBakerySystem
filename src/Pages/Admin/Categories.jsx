import React, { useEffect, useState } from "react";
import {
  Typography,
  TextField,
  Button,
  IconButton,
  Modal,
  Box,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: "" });
  const [editCategory, setEditCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState([]);
  const token = localStorage.getItem("auth-token");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await fetch("http://localhost:4000/admin/category", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (data.success) setCategories(data.categories);
  };

  const handleAddCategory = async () => {
    setErrors([]);
    try {
      const response = await fetch("http://localhost:4000/admin/category", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newCategory),
      });
      const data = await response.json();

      if (data.success) {
        setNewCategory({ name: "" });
        fetchCategories();
      } else {
        setErrors(data.message);
      }
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleEditCategory = async () => {
    setErrors([]);
    try {
      const response = await fetch(
        `http://localhost:4000/admin/category/${editCategory.id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editCategory),
        }
      );
      const data = await response.json();

      if (data.success) {
        fetchCategories();
        setShowModal(false);
      } else {
        setErrors(data.message);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleDeleteCategory = async (id) => {
    await fetch(`http://localhost:4000/admin/category/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    fetchCategories();
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-4xl mx-auto">
      <Typography
        variant="h4"
        className="text-center mb-6 font-semibold text-gray-700"
      >
        Categories Management
      </Typography>

      {/* Add New Category Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <Typography variant="h5" className="mb-4 font-medium text-gray-700">
          Add New Category
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

        <div className="flex items-center space-x-4">
          <TextField
            label="Category Name"
            value={newCategory.name}
            onChange={(e) => setNewCategory({ name: e.target.value })}
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleAddCategory}
          >
            Add Category
          </Button>
        </div>
      </div>

      {/* Categories List */}
      <div>
        <Typography variant="h5" className="mb-4 font-medium text-gray-700">
          Category List
        </Typography>
        <div className="grid grid-cols-1 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
            >
              <Typography variant="body1" className="text-gray-800">
                {category.name}
              </Typography>
              <div className="flex space-x-2">
                <IconButton
                  color="primary"
                  onClick={() => {
                    setEditCategory(category);
                    setShowModal(true);
                  }}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => handleDeleteCategory(category.id)}
                >
                  <Delete />
                </IconButton>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Category Modal */}
      {showModal && editCategory && (
        <Modal open={showModal} onClose={() => setShowModal(false)}>
          <Box className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-10">
            <Typography variant="h5" className="mb-4">
              Edit Category
            </Typography>
            <TextField
              label="Category Name"
              value={editCategory.name}
              onChange={(e) =>
                setEditCategory({ ...editCategory, name: e.target.value })
              }
              fullWidth
            />
            <div className="flex space-x-2 mt-4">
              <Button
                variant="contained"
                color="primary"
                onClick={handleEditCategory}
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
          </Box>
        </Modal>
      )}
    </div>
  );
};
export default Categories;
