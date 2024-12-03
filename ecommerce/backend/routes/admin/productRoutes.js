const express = require('express');
const { authMiddleware } = require('../../middlewares/authMiddleware');
const { getProducts } = require('../../controllers/admin/product/getProducts');
const { adminMiddleware } = require('../../middlewares/adminMiddleware');
const { addProduct } = require('../../controllers/admin/product/addProduct');
const { updateProduct } = require('../../controllers/admin/product/updateProduct');
const { deleteProduct } = require('../../controllers/admin/product/deleteProduct');
const { getCustomizedCakes } = require('../../controllers/admin/product/getCustomizedCakes');

const router = express.Router();

router.get('/', authMiddleware, adminMiddleware, getProducts);
router.get('/customized-cakes', authMiddleware, adminMiddleware, getCustomizedCakes);
router.post('/', authMiddleware, adminMiddleware, addProduct);
router.put('/:id', authMiddleware, adminMiddleware, updateProduct);
router.delete('/:id', authMiddleware, adminMiddleware, deleteProduct);

module.exports = router;