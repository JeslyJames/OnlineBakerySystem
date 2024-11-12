import { gql } from '@apollo/client';

// Mutation to register a new user
export const REGISTER_USER = gql`
  mutation RegisterUser(
    $name: String!,
    $email: String!,
    $password: String!,
    $street: String!,
    $city: String!,
    $province: String!,
    $postal_code: String!
  ) {
    registerUser(
      name: $name,
      email: $email,
      password: $password,
      street: $street,
      city: $city,
      province: $province,
      postal_code: $postal_code
    ) {
      id
      name
      email
    }
  }
`;

// Other mutations can go here
export const ADD_PRODUCT = gql`
  mutation AddProduct(
    $name: String!,
    $description: String!,
    $price: Float!,
    $weight: String,
    $category: String!,
    $image: String
  ) {
    addProduct(
      name: $name,
      description: $description,
      price: $price,
      weight: $weight,
      category: $category,
      image: $image
    ) {
      id
      name
      description
      price
      category
      image
    }
  }
`;
