import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  List,
  ListItem,
  Divider,
} from "@mui/material";

const ProductDisplay = ({ product }) => {
  
  return (
    <Card
      sx={{
        maxWidth: 600,
        margin: "0 auto",
        boxShadow: 3,
        borderRadius: 3,
        padding: 2,
      }}
    >
      <CardMedia
        component="img"
        height="300"
        image={product.image}
        alt={product.name}
        sx={{ borderRadius: 2, objectFit: "cover", marginBottom: 2 }}
      />

      <CardContent>
        <Typography variant="h4" component="h1" gutterBottom>
          {product.name}
        </Typography>

        <Typography variant="body1" color="text.secondary" gutterBottom>
          {product.description}
        </Typography>

        <Box display="flex" justifyContent="space-between" mt={2}>
          <Typography variant="h6" color="primary">
            Price: ${product.price}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Weight: {product.weight}
          </Typography>
        </Box>

        <Box mt={4}>
          <Typography variant="h5" component="h2" gutterBottom>
            Ingredients
          </Typography>
          <List>
            {product.ingredients.map((ingredient, index) => (
              <ListItem key={index} sx={{ padding: 0 }}>
                <Typography variant="body1" color="text.secondary">
                  • {ingredient}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box>
          <Typography variant="h5" component="h2" gutterBottom>
            Nutritional Information
          </Typography>
          <Box display="grid" gridTemplateColumns="1fr 1fr" gap={1}>
            <Typography variant="body2">
              <strong>Calories:</strong> {product.nutritionalContent.calories}
            </Typography>
            <Typography variant="body2">
              <strong>Fat:</strong> {product.nutritionalContent.fat}
            </Typography>
            <Typography variant="body2">
              <strong>Saturated Fat:</strong>{" "}
              {product.nutritionalContent.saturatedFat}
            </Typography>
            <Typography variant="body2">
              <strong>Cholesterol:</strong>{" "}
              {product.nutritionalContent.cholesterol}
            </Typography>
            <Typography variant="body2">
              <strong>Sodium:</strong> {product.nutritionalContent.sodium}
            </Typography>
            <Typography variant="body2">
              <strong>Carbohydrates:</strong>{" "}
              {product.nutritionalContent.carbohydrates}
            </Typography>
            <Typography variant="body2">
              <strong>Fiber:</strong> {product.nutritionalContent.fiber}
            </Typography>
            <Typography variant="body2">
              <strong>Sugar:</strong> {product.nutritionalContent.sugar}
            </Typography>
            <Typography variant="body2">
              <strong>Protein:</strong> {product.nutritionalContent.protein}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductDisplay;
