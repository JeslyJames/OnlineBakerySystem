import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_PRODUCT } from '../graphql/mutations'; // Ensure you have the correct path

const UpdateProduct = () => {
    const [productId, setProductId] = useState(""); // To hold the product ID
    const [name, setName] = useState(""); // For product name
    const [description, setDescription] = useState(""); // For product description
    const [price, setPrice] = useState(0); // For product price
    const [weight, setWeight] = useState(""); // For product weight
    const [category, setCategory] = useState(""); // For product category
    const [image, setImage] = useState(""); // For product image

    const [updateProduct] = useMutation(UPDATE_PRODUCT);

    const handleUpdate = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        try {
            const { data } = await updateProduct({
                variables: {
                    id: productId,
                    name,
                    description,
                    price: parseFloat(price), // Ensure price is a number
                    weight,
                    category,
                    image,
                },
            });
            console.log('Product updated:', data);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div>
            <h2>Update Product</h2>
            <form onSubmit={handleUpdate}>
                <input
                    type="text"
                    placeholder="Product ID"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    required
                />
                <button type="submit">Update Product</button>
            </form>
        </div>
    );
};

export default UpdateProduct;
