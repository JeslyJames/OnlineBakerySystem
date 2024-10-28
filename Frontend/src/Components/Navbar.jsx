import React from 'react';
import logo from './Assets/logo.jpeg';
import cart from './Assets/cart.png';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt='logo' />
      </div>

      <ul className="nav-menu">
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/Cakes'>Cakes</Link></li>
        <li><Link to='/Cheesecakes'>Cheesecakes</Link></li>
        <li><Link to='/Cupcakes'>Cupcakes</Link></li>
        <li><Link to='/AboutUs'>About Us</Link></li>
        <li><Link to='/ContactUs'>Contact Us</Link></li>
      </ul>

      <div className="nav-login-cart">
        <Link to='/Login'><button>Login</button></Link>
        <Link to='/Cart'><img src={cart} alt='cart' /></Link>
        <div className="nav-cart-count">0</div>
      </div>
    </div>
  );
}

export default Navbar;
