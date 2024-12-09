import React, { useEffect, useState } from "react";
import Item from "../Components/Item/Item";
import { useParams } from "react-router-dom";

const ProductsByCategory = ({ banner }) => {
  const { categoryId } = useParams();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`http://localhost:4000/getProductByCategoryId`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ categoryId: parseInt(categoryId) }),
          });
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, [categoryId]);
  
  return (
    <div>
      <div className="product">
        <div className="Banner-Container" style={{ position: 'relative', textAlign: 'center',color: 'white' }}>
          <img className="product-banner" src={banner} alt="Product Banner Image" style={{ opacity: 0.4}}/>
          <div class="centered"style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></div>
        </div>
        <div className="product-category">
          {products && products.length > 0 && products.map((item, i) => {
            return (
              <Item
                key={i}
                ID={item._id}
                name={item.name}
                image={item.image}
                desc={item.description}
                price={item.price}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductsByCategory;
