const express = require('express');
const router = express.Router();
const paymentsController = require('../../controllers/payments/paymentsController');

// Routes
router.get('/payments', paymentsController.getAllPayments);
router.get('/payments/:id', paymentsController.getPaymentById);
router.put('/payments/:id', paymentsController.putPayment);
router.delete('/payments/:id', paymentsController.deletePayment);

module.exports = router;