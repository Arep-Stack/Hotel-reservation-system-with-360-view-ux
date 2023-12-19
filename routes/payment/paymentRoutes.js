const express = require('express');
const router = express.Router();
const paypal = require('paypal-rest-sdk');
require('dotenv').config();

paypal.configure({
    mode: 'sandbox',
    client_id: process.env.PAYPAL_CLIENT_ID,
    client_secret: process.env.PAYPAL_CLIENT_SECRET,
  });
console.log(process.env.PAYPAL_CLIENT_ID)
router.get('/pay', (req, res) => {
    const create_payment_json = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      redirect_urls: {
        return_url: 'http://localhost:3002/success',
        cancel_url: 'http://localhost:3002/cancel',
      },
      transactions: [{
        item_list: {
          items: [{
            name: 'item',
            sku: 'item',
            price: '1.00',
            currency: 'PHP',
            quantity: 1,
          }],
        },
        amount: {
          currency: 'PHP',
          total: '101.00',
        },
        description: 'This is the payment description.',
      }],
    };
  
    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        throw error;
      } else {
        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel === 'approval_url') {
            res.redirect(payment.links[i].href);
          }
        }
      }
    });
  });

  router.get('/success', (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
  
    const execute_payment_json = {
      payer_id: payerId,
    };
  
    paypal.payment.execute(paymentId, execute_payment_json, function (
      error,
      payment
    ) {
      if (error) {
        console.error(error.response);
        throw error;
      } else {
        console.log(JSON.stringify(payment));
        res.send('Success');
      }
    });
  });
  
  router.get('/cancel', (req, res) => res.send('Cancelled'));

  module.exports = router;