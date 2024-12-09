import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../index.css';
import { UserContext } from '../Components/UserContext';

const Login = () => {
  const { setUser } = useContext(UserContext)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async (e) => {
    e.preventDefault();
    setMessage("");
  
    try {
      const response = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const responseData = await response.json();
  
      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        setMessage("Login successful!");
  
        setUser(responseData.user); // Set user in context
  
        setTimeout(() => {
          if (responseData.user.role === "Customer") {
            navigate("/");
          } else {
            navigate("/Products");
          }
        }, 2000); // Redirect after 2 seconds
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
        <h1>Login</h1>
        {message && <p className={message === "Login successful!" ? "text-center text-success" : "text-center text-danger"}>{message}</p>}
        <form className="login-form" onSubmit={login}>
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
          <button type="submit" className="login-button">Login</button>
          <p className="register-link">
            Don't have an account? <Link to='/signin'>Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
