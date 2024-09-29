const Product = require('../models/Product');
const Category = require('../models/Category');

const resolvers = {
  Query: {
    // Fetch products, optionally by category
    products: async (_, { category }) => {
      try {
        if (category) {
          const foundCategory = await Category.findOne({ name: category }).populate('products');
          if (!foundCategory) {
            throw new Error(`Category "${category}" not found`);
          }
          return foundCategory.products;
        }
        return await Product.find({});
      } catch (error) {
        console.error("Error fetching products:", error.message);
        throw new Error(error.message);
      }
    },

    // Fetch all categories
    categories: async () => {
      try {
        return await Category.find({}).populate('products');
      } catch (error) {
        console.error("Error fetching categories:", error.message);
        throw new Error(error.message);
      }
    },
  },

  Mutation: {
    // Add a new product to a category
    addProduct: async (_, { name, description, price, weight, category, image }) => {
      try {
        // Find the category
        let foundCategory = await Category.findOne({ name: category });
        if (!foundCategory) {
          throw new Error(`Category "${category}" not found`);
        }

        // Create a new product
        const newProduct = new Product({
          name,
          description,
          price,
          weight,
          category: foundCategory._id,
          image,
        });
        await newProduct.save();

        // Add the product to the category
        foundCategory.products.push(newProduct._id);
        await foundCategory.save();

        return newProduct;
      } catch (error) {
        console.error("Error adding product:", error.message);
        throw new Error(error.message);
      }
    },

    // Add a new category
    addCategory: async (_, { name }) => {
      try {
        const newCategory = new Category({ name });
        return await newCategory.save();
      } catch (error) {
        console.error("Error adding category:", error.message);
        throw new Error(error.message);
      }
    },

    // Update a product (including image)
    updateProduct: async (_, { id, name, description, price, weight, category, image }) => {
      try {
        // Find the product by ID
        const foundProduct = await Product.findById(id);
        if (!foundProduct) {
          throw new Error(`Product with ID: ${id} not found`);
        }

        // Update the product fields
        if (name) foundProduct.name = name;
        if (description) foundProduct.description = description;
        if (price) foundProduct.price = price;
        if (weight) foundProduct.weight = weight;
        if (category) foundProduct.category = category;
        if (image) foundProduct.image = image;

        await foundProduct.save();
        return foundProduct;
      } catch (error) {
        console.error("Error updating product:", error.message);
        throw new Error(error.message);
      }
    },

    // Delete a product
    deleteProduct: async (_, { id }) => {
      try {
        const deletedProduct = await Product.findByIdAndDelete(id);  // Update here
        if (!deletedProduct) {
          throw new Error(`Product with ID: ${id} not found`);
        }
        return deletedProduct;
      } catch (error) {
        console.error("Error deleting product:", error.message);
        throw new Error(error.message);
      }
    },
  },
};

module.exports = resolvers;
