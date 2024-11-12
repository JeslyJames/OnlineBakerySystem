import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import '../index.css';

// GraphQL mutation for logging in the user
const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        id
        name
        email
        role
      }
    }
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await loginUser({
        variables: {
          email,
          password,
        },
      });

      if (result.data) {
        const { token, user } = result.data.loginUser;

        // Store the token and user details in local storage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        // Redirect based on user role
        if (user.role === 'admin') {
          navigate('/admin-dashboard');  // Redirect to admin dashboard if admin
        } else {
          navigate('/dashboard');  // Redirect to customer dashboard if customer
        }
      }
    } catch (err) {
      console.error('Error logging in:', err.message);
    }
  };

  return (
    <div>
      <div className="login-container">
        <h1>Login</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {error && <p className="error-message">Error: {error.message}</p>}
          <p className="register-link">
            Don't have an account? <Link to='/Signin'>Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
