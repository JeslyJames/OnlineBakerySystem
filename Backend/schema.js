const { gql } = require('apollo-server-express');

// Define your GraphQL schema
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    role: String!  
  }

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

  type AuthPayload {
    token: String
    user: User
  }

  type Query {
    products(category: String): [Product]
    product(id: ID!): Product
    categories: [Category]
  }

  type Mutation {
    registerUser(
      name: String!,
      email: String!,
      password: String!,
      street: String!,
      city: String!,
      province: String!,
      postal_code: String!
    ): User

    loginUser(
      email: String!,
      password: String!
    ): AuthPayload

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

    deleteProduct(id: ID!): Product
  }
`;

module.exports = typeDefs;
