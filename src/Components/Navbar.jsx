import React, { useContext, useEffect, useState } from "react";
import logo from "./Assets/logo.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { ShoppingCart } from "@mui/icons-material";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const { name, role } = user || {};
  const [categories, setCategories] = useState([]);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1); // Default zoom level (1 = 100%)

  // Handlers for zoom adjustment
  const decreaseZoom = () => {
    setZoomLevel((prevZoom) => Math.max(0.8, prevZoom - 0.1)); // Min zoom level
  };

  const resetZoom = () => {
    setZoomLevel(1); // Reset to default zoom level
  };

  const increaseZoom = () => {
    setZoomLevel((prevZoom) => Math.min(1.5, prevZoom + 0.1)); // Max zoom level
  };

  useEffect(() => {
    // Apply zoom effect to the entire page
    document.body.style.transform = `scale(${zoomLevel})`;
    document.body.style.transformOrigin = "top left";
    document.body.style.width = `${100 / zoomLevel}%`;
  }, [zoomLevel]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:4000/allCategories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("auth-token");
    setUser(null);
    navigate("/");
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
    setShowMegaMenu(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-header">
        <img src={logo} alt="Cutiepie Cakes logo" className="nav-logo" />
        <button
          className="hamburger"
          aria-label="Toggle menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </div>

      <ul className={`nav-menu ${isMenuOpen ? "open" : ""}`}>
        {role === "Admin" ? (
          <>
            <li onClick={handleMenuItemClick}>
              <Link to="/Products">Products</Link>
            </li>
            <li onClick={handleMenuItemClick}>
              <Link to="/Categories">Categories</Link>
            </li>
            <li onClick={handleMenuItemClick}>
              <Link to="/Users">Users</Link>
            </li>
            <li onClick={handleMenuItemClick}>
              <Link to="/custom-cakes">Customized Cakes</Link>
            </li>
          </>
        ) : (
          <>
            <li onClick={handleMenuItemClick}>
              <Link to="/">Home</Link>
            </li>
            <li
              className="cakes-link"
              onMouseEnter={() => setShowMegaMenu(true)}
              onMouseLeave={() => setShowMegaMenu(false)}
            >
              <span onClick={() => setShowMegaMenu(!showMegaMenu)}>Cakes</span>
              {(showMegaMenu || isMenuOpen) && (
                <ul className="mega-menu">
                  {categories.map((category) => (
                    <li key={category.id} onClick={handleMenuItemClick}>
                      <Link
                        to={`/Cakes/${category.id}`}
                        className="mega-menu-item"
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            {user && (
              <li onClick={handleMenuItemClick}>
                <Link to="/customized-cakes">Customized Cakes</Link>
              </li>
            )}
            <li onClick={handleMenuItemClick}>
              <Link to="/AboutUs">About Us</Link>
            </li>
            <li onClick={handleMenuItemClick}>
              <Link to="/ContactUs">Contact Us</Link>
            </li>
          </>
        )}
        <li className="nav-controls-mobile">
          <button onClick={decreaseZoom} aria-label="Decrease zoom">
            A-
          </button>
          <button onClick={resetZoom} aria-label="Reset zoom">
            A
          </button>
          <button onClick={increaseZoom} aria-label="Increase zoom">
            A+
          </button>
        </li>
      </ul>

      <div className="nav-login-cart">
        <div className="nav-controls">
          <button onClick={decreaseZoom} aria-label="Decrease zoom">
            A-
          </button>
          <button onClick={resetZoom} aria-label="Reset zoom">
            A
          </button>
          <button onClick={increaseZoom} aria-label="Increase zoom">
            A+
          </button>
        </div>
        {!user ? (
          <Link to="/Login">
            <button>Login</button>
          </Link>
        ) : (
          <>
            <h4>
              Welcome, {name} {role === "Admin" && " (Admin)"}
            </h4>
            <button onClick={logout}>Logout</button>
            {role === "Customer" && (
              <Link to="/cart">
                <ShoppingCart />
              </Link>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
