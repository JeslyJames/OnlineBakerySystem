import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Footer = () => {
  return (
    <div>
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="container">
          <div className="row">
            <p className="col-md-6 mb-0 text-muted">© 2024 Cutiepie Cakes</p>
            <div className="col-md-6">
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
            
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
