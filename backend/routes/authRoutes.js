const express = require('express');
const { registerController } = require('../controllers/auth/registerController');
const { loginController } = require('../controllers/auth/loginController');

const router = express.Router();

router.post('/signup', registerController);
router.post('/login', loginController);

module.exports = router;
