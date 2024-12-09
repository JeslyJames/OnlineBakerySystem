const express = require('express');
const { authMiddleware } = require('../../middlewares/authMiddleware');
const { adminMiddleware } = require('../../middlewares/adminMiddleware');
const { getCategories } = require('../../controllers/admin/category/getCategories');
const { addCategory } = require('../../controllers/admin/category/addCategory');
const { updateCategory } = require('../../controllers/admin/category/updateCategory');
const { deleteCategory } = require('../../controllers/admin/category/deleteCategory');

const router = express.Router();

router.get('/', authMiddleware, adminMiddleware, getCategories);
router.post('/', authMiddleware, adminMiddleware, addCategory);
router.put('/:id', authMiddleware, adminMiddleware, updateCategory);
router.delete('/:id', authMiddleware, adminMiddleware, deleteCategory);

module.exports = router;