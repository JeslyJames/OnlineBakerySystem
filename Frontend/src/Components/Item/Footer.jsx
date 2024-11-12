import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css"; // Ensure this is correct

const Footer = () => {
  return (
    <div className="footer">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="footer-content">
          <p className="footer-text">© 2024 Cutiepie Cakes</p>
          <ul className="footer-menu">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/Cakes">Cakes</Link>
            </li>
            <li>
              <Link to="/Cupcakes">Cupcakes</Link>
            </li>
            <li>
              <Link to="/Croissants">Croissants</Link>
            </li>
            <li>
              <Link to="/AboutUs">About Us</Link>
            </li>
            <li>
              <Link to="/ContactUs">Contact Us</Link>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
