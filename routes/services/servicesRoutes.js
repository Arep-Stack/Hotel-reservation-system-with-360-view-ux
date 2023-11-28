const express = require('express');
const router = express.Router();
const amenityController = require('../../controllers/services/servicesController');

// Routes
router.post('/services', amenityController.postService);
router.get('/services', amenityController.getAllService);
router.get('/services/:id', amenityController.getServiceById);
router.put('/services/:id', amenityController.putService);
router.delete('/services/:id', amenityController.deleteService);

module.exports = router;