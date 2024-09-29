const { gql } = require('apollo-server-express');

// Define your GraphQL schema
const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    description: String!
    price: Float!
    weight: String
    category: String!
    image: String
  }

  type Category {
    id: ID!
    name: String!
    products: [Product]
  }

  type Query {
    products(category: String): [Product]
    categories: [Category]
  }

  type Mutation {
    addProduct(
      name: String!,
      description: String!,
      price: Float!,
      weight: String,
      category: String!,
      image: String
    ): Product

    updateProduct(
      id: ID!,
      name: String,
      description: String,
      price: Float,
      weight: String,
      category: String,
      image: String
    ): Product

    addCategory(name: String!): Category

    deleteProduct(id: ID!): Product
  }
`;

// Export the typeDefs
module.exports = typeDefs;
