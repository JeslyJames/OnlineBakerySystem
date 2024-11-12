// src/Pages/ProductList.jsx
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../graphql/queries';

const ProductList = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading products: {error.message}</p>;

  return (
    <div>
      <h1>Products</h1>
      {data.products.map(product => (
        <div key={product.id}>
          <img src={`http://localhost:5000/images/${product.image}`} alt={product.name} />
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <p>Weight: {product.weight}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
