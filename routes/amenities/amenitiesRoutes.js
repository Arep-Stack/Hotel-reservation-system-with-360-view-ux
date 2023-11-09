const express = require('express');
const router = express.Router();
const amenityController = require('../../controllers/amenities/amenitiesController');

// Routes
router.post('/amenities', amenityController.postAmenity);
router.get('/amenities', amenityController.getAllAmenities);
router.get('/amenities/:id', amenityController.getAmenityById);
router.put('/amenities/:id', amenityController.putAmenity);
router.delete('/amenities/:id', amenityController.deleteAmenity);

module.exports = router;