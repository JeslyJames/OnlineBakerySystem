import React, { useContext } from "react";
import "./CSS/Product.css";
import { ShopContext } from "../Context/ShopContext";
import Item from "../Components/Item/Item";





const Product = (props) => {
  const { all_product } = useContext(ShopContext);

  const bannerContainerStyle = {
    position: "relative",
    textAlign: "center",
  };

  const bannerStyle = {
    width: "100%",
    height: "auto",
  };

  const quoteStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "rgba(0, 0, 0, 0.5)", // Semi-transparent black
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "5px",
    fontSize: "1.5rem",
    fontWeight: "bold",
    textShadow: "1px 1px 5px rgba(0, 0, 0, 0.7)",
  };

  return (
    <div className="product">
      <div style={bannerContainerStyle}>
      <img className="product-banner" src={props.banner} alt="Prouct Banner Image" />
        <div style={quoteStyle}>
          {/* Change the quote here */}
          "Baking happiness one cake at a time."
        </div>
      </div>
      <div className="product-category">
        {all_product.map((item, i) => (
          <Item
            key={i}
            ID={item._id}
            name={item.name}
            image={item.image}
            desc={item.description}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default Product;
