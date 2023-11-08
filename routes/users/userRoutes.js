const express = require('express');
const router = express.Router();
const userController = require('../../controllers/users/userController');
const loginController = require('../../controllers/util/loginController');
const regitserController = require('../../controllers/util/registerController');

// Routes
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.get('/users/email/:email', userController.getUserByEmail);
router.put('/users/:id', userController.putUser);
router.delete('/users/:id', userController.deleteUser);
router.post('/users/login', loginController.loginUser);
router.post('/users/register', regitserController.registerUser);

module.exports = router;
