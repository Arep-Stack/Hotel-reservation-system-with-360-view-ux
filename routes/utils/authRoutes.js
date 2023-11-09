const express = require('express');
const router = express.Router();
const authController = require('../../controllers/util/authController');

// Routes
router.post('/auth', authController.authenticate);

module.exports = router;

