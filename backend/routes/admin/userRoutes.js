const express = require('express');
const { authMiddleware } = require('../../middlewares/authMiddleware');
const { adminMiddleware } = require('../../middlewares/adminMiddleware');
const { getUsers } = require('../../controllers/admin/users/getUsers');

const router = express.Router();

router.get('/', authMiddleware, adminMiddleware, getUsers);

module.exports = router;