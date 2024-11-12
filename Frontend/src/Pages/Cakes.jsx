import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_CATEGORIES_WITH_PRODUCTS } from '../graphql/queries';

const Cakes = () => {
    const { loading, error, data } = useQuery(GET_CATEGORIES_WITH_PRODUCTS);

    // This useState holds the image load state for each product
    const [imageLoaded, setImageLoaded] = useState({});

    // Populate the imageLoaded state with false for each product initially
    useEffect(() => {
        if (data) {
            const initialImageState = {};
            const cakeCategories = ["Birthday Cakes", "Cheesecakes", "Chocolate Cakes", "Wedding Cakes"];
            data.categories.forEach(category => {
                if (cakeCategories.includes(category.name)) {
                    category.products.forEach(product => {
                        initialImageState[product.id] = false; // Initially set to false
                    });
                }
            });
            setImageLoaded(initialImageState);
        }
    }, [data]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading cakes and categories: {error.message}</p>;

    // Combine all cake-related categories into one product list
    const cakeCategories = ["Birthday Cakes", "Cheesecakes", "Chocolate Cakes", "Wedding Cakes"];
    let allCakeProducts = [];

    data.categories.forEach(category => {
        if (cakeCategories.includes(category.name)) {
            allCakeProducts = allCakeProducts.concat(category.products);
        }
    });

    const handleImageLoad = (productId) => {
        setImageLoaded(prevState => ({
            ...prevState,
            [productId]: true,
        }));
    };

    // Inline styles for Flexbox layout
    const categoryPageStyle = {
        padding: '20px',
    };

    const productsStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        gap: '20px',
    };

    const productStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '250px',
        border: '1px solid #ddd',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#fff',
    };

    const productImageStyle = {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        borderBottom: '1px solid #ddd',
    };

    const productTitleStyle = {
        fontSize: '18px',
        margin: '15px 0',
        color: '#D5006D',  // Change to dark pink
    };

    const productDescriptionStyle = {
        fontSize: '16px',
        margin: '5px 0',
        color: '#D5006D',  // Change to dark pink
    };

    return (
        <div style={categoryPageStyle}>
            <h1 style={{ color: '#D5006D' }}>All Cakes</h1> {/* Change title color as well */}
            {allCakeProducts.length > 0 ? (
                <div style={productsStyle}>
                    {allCakeProducts.map(product => (
                        <Link key={product.id} to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                            <div style={productStyle}>
                                {!imageLoaded[product.id] && <p>Loading image...</p>}  {/* Show loading text */}
                                <img
                                    src={`http://localhost:5000${product.image}`}  // Ensure the correct path here
                                    alt={product.name}
                                    style={{ ...productImageStyle, display: imageLoaded[product.id] ? 'block' : 'none' }}  // Hide until loaded
                                    onLoad={() => handleImageLoad(product.id)}  // Set loaded state when image loads
                                    onError={(e) => {
                                        e.target.src = '/images/default.jpg';  // Fallback if image fails
                                        console.error(`Error loading image for product: ${product.name}`); // Log error for debugging
                                    }}
                                />
                                <h3 style={productTitleStyle}>{product.name}</h3>
                                <p style={productDescriptionStyle}>{product.description}</p>
                                <p>Price: ${product.price}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <p>No cakes available.</p>
            )}
        </div>
    );
};

export default Cakes;
