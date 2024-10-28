import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_CATEGORIES_WITH_PRODUCTS } from '../graphql/queries';

const Cheesecakes = () => {
  const { loading, error, data } = useQuery(GET_CATEGORIES_WITH_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading cheesecakes: {error.message}</p>;

  // Find the cheesecakes category
  const cheesecakesCategory = data.categories.find(category => category.name === 'Cheesecakes');

  // Dark pink color
  const darkPinkColor = '#D5006D';

  return (
    <div className="cheesecakes-page">
      <h1 style={{ color: darkPinkColor }}>Cheesecakes</h1>
      <div className="products" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {cheesecakesCategory && cheesecakesCategory.products.length > 0 ? (
          cheesecakesCategory.products.map(product => (
            <Link key={product.id} to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
              <div className="product" style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', width: '200px', textAlign: 'center' }}>
                <img
                  src={`http://localhost:5000/images/${product.image}`}
                  alt={product.name}
                  style={{ width: '100%', height: '150px', objectFit: 'cover', borderBottom: '1px solid #ddd', marginBottom: '10px' }}
                />
                <h3 style={{ color: darkPinkColor }}>{product.name}</h3>
                <p style={{ color: darkPinkColor }}>{product.description}</p>
                <p>Price: ${product.price}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>No cheesecakes available.</p>
        )}
      </div>
    </div>
  );
};

export default Cheesecakes;
