require('dotenv').config();  // Load environment variables from .env

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const path = require('path');  // Import the path module
const typeDefs = require('./schema');  // Import typeDefs from schema.js
const resolvers = require('./resolvers/resolvers');  // Import resolvers

const app = express();

// Serve images from the Public/images folder
app.use('/images', express.static(path.join(__dirname, 'Public', 'images')));  // Use 'images' in lowercase

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,   // Pass the typeDefs here
  resolvers,  // Pass the resolvers here
});

server.start().then(() => {
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/graphql`);
  });
});
