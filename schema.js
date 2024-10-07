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

  type Address {
    street: String
    city: String
    province: String
    postal_code: String
  }

  type User {
    id: ID!
    name: String!
    email: String!
    address: Address
    role: String
  }

  type AuthPayload {
    token: String!
    user: User!
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

    registerUser(
      name: String!,
      email: String!,
      password: String!,
      street: String!,
      city: String!,
      province: String!,
      postal_code: String!,
      role: String
    ): User

    loginUser(
      email: String!,
      password: String!
    ): AuthPayload
  }
`;

// Export the typeDefs
module.exports = typeDefs;
