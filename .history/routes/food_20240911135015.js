const express = require('express');
const verifyJWT = require('../middleware/verifyJWT');
const {getById, getByQuery, insert, inserts, updateById} = require('../controllers/food');

const router = express.Router();

router.get("/:id", getById);

router.get("/", getByQuery);

router.post("/:id", insert);

router.post("/", inserts);

router.put("/:id", updateById);

// Authentication
router.post('/users/login', userController.userLogin);

// Registration
router.post('/users', userController.registerUser);

// Get Current User
router.get('/user', verifyJWT, userController.getCurrentUser);

// Update User
router.put('/user', verifyJWT, userController.updateUser);

module.exports = router;