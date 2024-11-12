import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { GET_CATEGORIES_WITH_PRODUCTS } from '../graphql/queries'; // Adjust import if necessary

const Cupcakes = () => {
    const { loading, error, data } = useQuery(GET_CATEGORIES_WITH_PRODUCTS); // Fetch all categories with products

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading cupcakes: {error.message}</p>;

    // Collect all cupcakes from relevant categories
    const cupcakeCategories = ["Chocolate Cupcakes", "Red Velvet Cupcakes", "Vanilla Cupcakes"];
    const allCupcakes = [];

    data.categories.forEach(category => {
        if (cupcakeCategories.includes(category.name)) {
            allCupcakes.push(...category.products); // Add the products to the array
        }
    });

    // Dark pink color
    const darkPinkColor = '#D5006D'; // Adjust this color as needed

    return (
        <div className="cupcakes-page">
            <h1 style={{ color: darkPinkColor }}>Cupcakes</h1> {/* Change color of the title */}
            <div className="products" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                {allCupcakes.length > 0 ? (
                    allCupcakes.map(product => (
                        <Link key={product.id} to={`/product/${product.id}`} style={{ textDecoration: 'none' }}> {/* Wrap product in Link */}
                            <div className="product" style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', width: '200px', textAlign: 'center' }}>
                                <img
                                    src={`http://localhost:5000/images/${product.image}`}
                                    alt={product.name}
                                    style={{ width: '100%', height: '150px', objectFit: 'cover', borderBottom: '1px solid #ddd', marginBottom: '10px' }}
                                />
                                <h3 style={{ color: darkPinkColor }}>{product.name}</h3> {/* Change color of product name */}
                                <p style={{ color: darkPinkColor }}>{product.description}</p> {/* Change color of product description */}
                                <p>Price: ${product.price}</p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>No cupcakes available.</p>
                )}
            </div>
        </div>
    );
};

export default Cupcakes;
