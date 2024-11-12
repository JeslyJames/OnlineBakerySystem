// src/Pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_PRODUCT } from '../graphql/mutations';
import { GET_CATEGORIES } from '../graphql/queries';  // Import the query to fetch categories

const AdminDashboard = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    weight: '',
    category: '', // This will be selected from dropdown
    image: '',
  });

  const { loading: loadingCategories, error: errorCategories, data: categoryData } = useQuery(GET_CATEGORIES);
  const [addProduct, { loading, error }] = useMutation(ADD_PRODUCT);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProduct({
        variables: {
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          weight: formData.weight,
          category: formData.category,
          image: formData.image,
        },
      });
      alert('Product added successfully!');
      setFormData({
        name: '',
        description: '',
        price: '',
        weight: '',
        category: '',
        image: '',
      });
    } catch (err) {
      console.error('Error adding product:', err.message);
      alert(`Error adding product: ${err.message}`);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {loadingCategories ? (
        <p>Loading categories...</p>
      ) : errorCategories ? (
        <p>Error fetching categories: {errorCategories.message}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required />
          <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
          <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
          <input type="text" name="weight" placeholder="Weight" value={formData.weight} onChange={handleChange} />
          <select name="category" onChange={handleChange} required>
            <option value="">Select Category</option>
            {categoryData.categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} />
          <button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add Product'}</button>
          {error && <p className="error-message">Error: {error.message}</p>}
        </form>
      )}
    </div>
  );
};

export default AdminDashboard;
