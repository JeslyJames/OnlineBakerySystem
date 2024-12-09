import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'

const Signin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [message, setMessage] = useState(""); // State for error or success message

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const signup = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    setMessage(""); // Clear previous message

    try {
      const response = await fetch("http://localhost:4000/auth/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (responseData.success) {
        setMessage("Signup successful!");
        setTimeout(() => navigate("/login"), 2000); // Redirect to login after 2 seconds
      } else {
        setMessage(responseData.errors); // Display error message from API
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <div className="login-container">
        <h1>Sign Up</h1>
        {message && <p className={message === "Signup successful!" ? "text-center text-success" : "text-center text-danger"}>{message}</p>}
        <form className="login-form" onSubmit={signup}>
          <div className="form-group">
            <label htmlFor="Name">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={changeHandler}
              id="name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={changeHandler}
              id="email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={changeHandler}
              id="password"
              required
            />
          </div>
          
          <button type="submit" className="login-button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
