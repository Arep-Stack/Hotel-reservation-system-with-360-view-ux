const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const loginController = require('../controllers/loginController');

// Create a new user
router.post('/users', userController.postUser);
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.get('/users/email/:email', userController.getUserByEmail);
router.put('/users/:id', userController.putUser);
router.delete('/users/:id', userController.deleteUser);
router.post('/login', loginController.loginUser);

module.exports = router;
