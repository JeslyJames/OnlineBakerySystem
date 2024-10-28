import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PRODUCT_BY_ID } from '../graphql/queries';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // Hook to programmatically navigate
    const { loading, error, data } = useQuery(GET_PRODUCT_BY_ID, {
        variables: { id },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching product details: {error.message}</p>;

    const { name, description, price, weight, image } = data.product;

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1 style={{ color: '#D5006D' }}>{name}</h1> {/* Dark pink color */}
            <img
                src={`http://localhost:5000${image}`}
                alt={name}
                style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '8px', marginBottom: '20px' }}
            />
            <p>{description}</p>
            <p>Price: ${price}</p>
            <p>Weight: {weight}</p>
            {/* You can add more details as needed */}

            <button
                onClick={() => navigate(-1)}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#D5006D', // Dark pink color
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    marginTop: '20px'
                }}
            >
                Back to Products
            </button>
        </div>
    );
};

export default ProductDetail;
