import { gql } from '@apollo/client';

// Query to get categories with their associated products
export const GET_CATEGORIES_WITH_PRODUCTS = gql`
  query GetCategoriesWithProducts {
    categories {
      id
      name
      products {
        id
        name
        description
        price
        weight
        image
      }
    }
  }
`;

// Query to get all categories for the dropdown in Admin Dashboard
export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
    }
  }
`;

// Query to get all products with their images
export const GET_PRODUCTS_WITH_IMAGES = gql`
  query GetProductsWithImages {
    products {
      id
      name
      description
      price
      image
    }
  }
`;

// Query to get a single product by its ID
export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($id: ID!) {
    product(id: $id) {
      id
      name
      description
      price
      weight
      image
    }
  }
`;
