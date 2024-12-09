import React from "react";
import { Link } from "react-router-dom";
<<<<<<< HEAD
import "./Navbar.css"
=======
>>>>>>> 78af459b5ab1885d8b99dc1a45856afcf7f760dd

const Footer = () => {
  const footerStyle = {
    backgroundColor: "#f8f9fa",
    color: "#626262",
    padding: "20px 0",
    borderTop: "1px solid #ddd",
  };

  const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
<<<<<<< HEAD
=======
    flexDirection: "column",
    width: "100%",
>>>>>>> 78af459b5ab1885d8b99dc1a45856afcf7f760dd
  };

  const textStyle = {
    margin: 0,
    fontSize: "14px",
    color: "#333",
<<<<<<< HEAD
=======
    textAlign: "center",
    marginBottom: "10px",
>>>>>>> 78af459b5ab1885d8b99dc1a45856afcf7f760dd
  };

  const menuStyle = {
    listStyle: "none",
    display: "flex",
    gap: "15px",
    justifyContent: "flex-end",
    padding: 0,
    margin: 0,
<<<<<<< HEAD
=======
    flexWrap: "wrap",
    justifyContent: "center",
>>>>>>> 78af459b5ab1885d8b99dc1a45856afcf7f760dd
  };

  const menuItemStyle = {
    fontSize: "14px",
<<<<<<< HEAD
=======
    textAlign: "center",
>>>>>>> 78af459b5ab1885d8b99dc1a45856afcf7f760dd
  };

  const linkStyle = {
    textDecoration: "none",
    color: "#626262",
    transition: "color 0.3s ease",
  };

  const linkHoverStyle = {
    color: "#d31672",
  };

  return (
    <div>
      <footer style={footerStyle}>
        <div style={containerStyle}>
<<<<<<< HEAD
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <p style={textStyle}>© 2024 Cutiepie Cakes</p>
            <ul style={menuStyle}>
              <li style={menuItemStyle}>
                <Link to="/" style={linkStyle} onMouseEnter={e => (e.target.style.color = linkHoverStyle.color)} onMouseLeave={e => (e.target.style.color = linkStyle.color)}>
                  Home
                </Link>
              </li>
              <li style={menuItemStyle}>
                <Link to="/Cakes" style={linkStyle} onMouseEnter={e => (e.target.style.color = linkHoverStyle.color)} onMouseLeave={e => (e.target.style.color = linkStyle.color)}>
                  Cakes
                </Link>
              </li>
              <li style={menuItemStyle}>
                <Link to="/Cupcakes" style={linkStyle} onMouseEnter={e => (e.target.style.color = linkHoverStyle.color)} onMouseLeave={e => (e.target.style.color = linkStyle.color)}>
                  Cupcakes
                </Link>
              </li>
             
              <li style={menuItemStyle}>
                <Link to="/AboutUs" style={linkStyle} onMouseEnter={e => (e.target.style.color = linkHoverStyle.color)} onMouseLeave={e => (e.target.style.color = linkStyle.color)}>
                  About Us
                </Link>
              </li>
              <li style={menuItemStyle}>
                <Link to="/ContactUs" style={linkStyle} onMouseEnter={e => (e.target.style.color = linkHoverStyle.color)} onMouseLeave={e => (e.target.style.color = linkStyle.color)}>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
=======
          <p style={textStyle}>© 2024 Cutiepie Cakes</p>
          <ul style={menuStyle}>
            <li style={menuItemStyle}>
              <Link
                to="/"
                style={linkStyle}
                onMouseEnter={(e) => (e.target.style.color = linkHoverStyle.color)}
                onMouseLeave={(e) => (e.target.style.color = linkStyle.color)}
              >
                Home
              </Link>
            </li>
            <li style={menuItemStyle}>
              <Link
                to="/Cakes"
                style={linkStyle}
                onMouseEnter={(e) => (e.target.style.color = linkHoverStyle.color)}
                onMouseLeave={(e) => (e.target.style.color = linkStyle.color)}
              >
                Cakes
              </Link>
            </li>
            <li style={menuItemStyle}>
              <Link
                to="/Cupcakes"
                style={linkStyle}
                onMouseEnter={(e) => (e.target.style.color = linkHoverStyle.color)}
                onMouseLeave={(e) => (e.target.style.color = linkStyle.color)}
              >
                Cupcakes
              </Link>
            </li>

            <li style={menuItemStyle}>
              <Link
                to="/AboutUs"
                style={linkStyle}
                onMouseEnter={(e) => (e.target.style.color = linkHoverStyle.color)}
                onMouseLeave={(e) => (e.target.style.color = linkStyle.color)}
              >
                About Us
              </Link>
            </li>
            <li style={menuItemStyle}>
              <Link
                to="/ContactUs"
                style={linkStyle}
                onMouseEnter={(e) => (e.target.style.color = linkHoverStyle.color)}
                onMouseLeave={(e) => (e.target.style.color = linkStyle.color)}
              >
                Contact Us
              </Link>
            </li>
          </ul>
>>>>>>> 78af459b5ab1885d8b99dc1a45856afcf7f760dd
        </div>
      </footer>
    </div>
  );
};

export default Footer;
