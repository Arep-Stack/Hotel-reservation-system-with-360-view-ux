const express = require('express');
const router = express.Router();
const userController = require('../../controllers/users/userController');
const loginController = require('../../controllers/util/loginController');
const regitserController = require('../../controllers/util/registerController');
const auth = require('../../controllers/util/authController');
// Routes
router.post('/users/login', loginController.loginUser);

//Authenticated
router.get('/users', auth.authenticateToken ,userController.getAllUsers);
router.get('/users/:id', auth.authenticateToken ,userController.getUserById);
router.get('/users/email/:email', auth.authenticateToken ,userController.getUserByEmail);
router.put('/users/:id', auth.authenticateToken ,userController.putUser);
router.delete('/users/:id', auth.authenticateToken ,userController.deleteUser);
router.post('/users/register', auth.authenticateToken ,regitserController.registerUser);

module.exports = router;
