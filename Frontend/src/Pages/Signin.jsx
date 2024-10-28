import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../graphql/mutations';  // Ensure this path is correct
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    street: '',
    city: '',
    province: '',
    postal_code: '',
  });

  const [registerUser, { loading, error }] = useMutation(REGISTER_USER);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await registerUser({
        variables: {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          street: formData.street,
          city: formData.city,
          province: formData.province,
          postal_code: formData.postal_code,
        },
      });

      if (data) {
        alert('Registration Successful');
        // Redirect to login page after registration
        navigate('/login');
      }
    } catch (err) {
      console.error('Error registering:', err.message);
      alert(`Registration failed: ${err.message}`); // Improved error message for better UX
    }
  };

  return (
    <div className="login-container">
      <h1>Sign Up</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="street">Street</label>
          <input
            type="text"
            id="street"
            value={formData.street}
            onChange={handleChange}
            required
            placeholder="Enter your street address"
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            value={formData.city}
            onChange={handleChange}
            required
            placeholder="Enter your city"
          />
        </div>
        <div className="form-group">
          <label htmlFor="province">Province</label>
          <input
            type="text"
            id="province"
            value={formData.province}
            onChange={handleChange}
            required
            placeholder="Enter your province"
          />
        </div>
        <div className="form-group">
          <label htmlFor="postal_code">Postal Code</label>
          <input
            type="text"
            id="postal_code"
            value={formData.postal_code}
            onChange={handleChange}
            required
            placeholder="Enter your postal code"
          />
        </div>
        <button type="submit" className="login-button">
          {loading ? 'Registering...' : 'Sign Up'}
        </button>
        {error && <p className="error-message">Error: {error.message}</p>}
      </form>
    </div>
  );
};

export default Signin;
