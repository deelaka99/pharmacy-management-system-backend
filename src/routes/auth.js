const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticate = require('../middleware/authenticate');

// Only allow the owner to register new users
router.post('/register', authenticate, authController.register);

// Allow all users to login
router.post('/login', authController.login);

module.exports = router;
