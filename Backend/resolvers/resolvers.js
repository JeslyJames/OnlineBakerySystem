const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Product = require('../models/Product');
const Category = require('../models/Category');
const User = require('../models/User');

const resolvers = {
  Query: {
    products: async (_, { category }) => {
      try {
        if (category) {
          const foundCategory = await Category.findOne({ name: category }).populate('products');
          return foundCategory ? foundCategory.products : [];
        }
        return await Product.find();
      } catch (error) {
        throw new Error(error.message);
      }
    },
    product: async (_, { id }) => {
      try {
        const product = await Product.findById(id);
        if (!product) throw new Error(`Product with ID ${id} not found`);
        return product;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    categories: async () => {
      try {
        return await Category.find().populate('products');
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
  Mutation: {
    addProduct: async (_, { name, description, price, weight, category, image }) => {
      try {
        const foundCategory = await Category.findOne({ name: category });
        if (!foundCategory) throw new Error(`Category "${category}" not found`);

        const newProduct = new Product({ 
          name, 
          description, 
          price, 
          weight, 
          category: foundCategory._id, 
          image 
        });
        await newProduct.save();

        foundCategory.products.push(newProduct._id);
        await foundCategory.save();

        return newProduct;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    // User Registration
    registerUser: async (_, { name, email, password, street, city, province, postal_code }) => {
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error('User already exists');
        }

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
          name,
          email,
          password: hashedPassword,
          address: { street, city, province, postal_code },
          role: 'customer',  // Default role
        });

        const savedUser = await newUser.save();
        return savedUser;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    // User Login
    loginUser: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          throw new Error('Invalid credentials');
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
          expiresIn: '1d', // Token expiration time
        });

        return {
          token,
          user,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },

    // Example for updating a product
    updateProduct: async (_, { id, name, description, price, weight, category, image }) => {
      try {
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
        throw new Error(error.message);
      }
    },

    // Example for deleting a product
    deleteProduct: async (_, { id }) => {
      try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
          throw new Error(`Product with ID: ${id} not found`);
        }
        return deletedProduct;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

module.exports = resolvers;
