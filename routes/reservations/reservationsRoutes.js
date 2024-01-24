const express = require('express');
const router = express.Router();
const reservationsController = require('../../controllers/reservations/reservationsController');

// Routes
router.post('/reservations', reservationsController.postReservation);
router.get('/reservations', reservationsController.getAllReservation);
router.get('/reservations/:id', reservationsController.getReservationById);
router.put('/reservations/:id', reservationsController.putReservation);
router.delete('/reservations/:id', reservationsController.deleteReservation);

module.exports = router;