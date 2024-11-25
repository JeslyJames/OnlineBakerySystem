import React, { useContext, useEffect, useState } from 'react';
import logo from './Assets/logo.jpeg';
import cart from './Assets/cart.png';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';

const Navbar = () => {
  const { getTotalCartItems } = useContext(ShopContext);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) { // Adjust scroll threshold as needed
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`navbar ${isScrolled ? 'scrolled' : ''}`}> {/* Toggle 'scrolled' class */}
      <div className="nav-logo">
        <img src={logo} alt="logo" />
      </div>
      <ul className="nav-menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/Cakes">Cakes</Link></li>
        <li><Link to="/Cupcakes">Cupcakes</Link></li>
        <li><Link to="/Cheesecakes">Cheesecakes</Link></li>
        <li><Link to="/AboutUs">About Us</Link></li>
        <li><Link to="/ContactUs">Contact Us</Link></li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem('auth-token') ? (
          <button onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/'); }}>
            Logout
          </button>
        ) : (
          <Link to="/Login"><button>Login</button></Link>
        )}
        <Link to="/Cart"><img src={cart} alt="cart" /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
