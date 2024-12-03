const express = require('express');
const { fetchProducts, fetchProductById } = require('../controllers/fetchProducts');
const { fetchCategories, fetchProductsByCategoryId } = require('../controllers/fetchCategories');
const { saveCustomizedCake } = require('../controllers/saveCustomizedCake');
const { addToCart } = require('../controllers/addToCart');
const { getCartItems } = require('../controllers/getCartItems');
const { deleteCartItem, deleteCart } = require('../controllers/deleteCartItem');
const { createOrder, getUserOrders } = require('../controllers/orderController');

const router = express.Router();

router.get('/allProducts', fetchProducts);
router.post('/getProductById', fetchProductById);
router.get('/allCategories', fetchCategories);
router.post('/getProductByCategoryId', fetchProductsByCategoryId);
router.post('/saveCustomizedCake', saveCustomizedCake);
router.post('/cart', addToCart);
router.post('/cart-items', getCartItems);
router.delete('/cart/:cartItemId', deleteCartItem);
router.delete('/cart/clear/:userId', deleteCart);
router.post('/orders', createOrder);
router.get('/orders/:userId', getUserOrders);

module.exports = router;