const express = require('express');
const verifyJWT = require('../middleware/verifyJWT');
const userController = require('../controllers/usersController');

const router = express.Router();

// Authentication
router.post('/users/login', userController.userLogin);

// Registration
router.post('/users', userController.registerUser);

// Get Current User
router.get('/user', verifyJWT, userController.getCurrentUser);

// Update User
router.put('/user', verifyJWT, userController.updateUser);

module.exports = router;