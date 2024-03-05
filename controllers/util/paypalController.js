const paypal = require('paypal-rest-sdk');
const reservationModel = require('../../models/reservations/reservationsModel');
const serviceModel = require('../../models/services/servicesModel');
const paymentModel = require('../../models/payment/paymentModel');

let userId;
let reservationId;
require('dotenv').config();

paypal.configure({
    mode: 'sandbox',
    client_id: process.env.PAYPAL_CLIENT_ID,
    client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

const createPayment = async (req, res) => {
    const amount = req.query?.amount;
    try {
        reservationId = req.query.id;
        const reservation = await reservationModel.getReservationById(reservationId);

        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }

        userId = reservation.USER_ID;

        const service = await serviceModel.getServiceById(reservation.SERVICE_ID);

        if (!service) {
            return res.status(404).json({ error: 'Service not found' });
        }

        const randomCode = `${Math.floor(Math.random() * 10000)}${Array.from({ length: 4 }, () => String.fromCharCode(65 + Math.floor(Math.random() * 26))).join('')}`;

        const create_payment_json = {
            intent: 'sale',
            payer: {
                payment_method: 'paypal',
            },
            redirect_urls: {
                return_url: 'https://hotel-reservation-system-with-360-view-azure.vercel.app/Paypal-Callback',
                cancel_url: 'https://hotel-reservation-system-with-360-view-azure.vercel.app/Paypal-Callback',
            },
            transactions: [{
                item_list: {
                    items: [{
                        name: service.TYPE,
                        sku: `${service.NAME}-${randomCode}`,
                        price: amount,
                        currency: 'PHP',
                        quantity: 1,
                    }],
                },
                amount: {
                    currency: 'PHP',
                    total: amount,
                },
                description: 'This is the payment description.',
            }],
        };

        paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                console.error(error);
                return res.status(500).json({ error: 'Internal Server Error' });
            } else {
                for (let i = 0; i < payment.links.length; i++) {
                    if (payment.links[i].rel === 'approval_url') {
                        return res.redirect(payment.links[i].href);
                    }
                }
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const executePayment = (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
        payer_id: payerId,
    };

    paypal.payment.execute(paymentId, execute_payment_json, async function (error, payment) {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        } else {
            try {
                const newPayment = {
                    PAYMENT_CODE: payment.id,
                    USER_ID: userId,
                    TYPE: payment.payer.payment_method,
                    CONTENT: JSON.stringify(payment),
                };

                const createPayment = await paymentModel.createPayment(newPayment);

                if (!createPayment) {
                    return res.status(400).json({ error: 'Bad Request' });
                } else {
                    const updatedReservation = {
                        STATUS: "PAID"
                    }
                    const updateReservationStatus = await reservationModel.updateReservation(reservationId, updatedReservation);
                    if (!updateReservationStatus) {
                        return res.status(400).json({ error: 'Bad Request' });
                    }
                    return res.status(201).json(createPayment);
                }
            } catch (error) {
                console.error('Error in createPaymentController', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    });
};

const cancelPayment = (req, res) => res.send('Cancelled');

module.exports = {
    createPayment,
    executePayment,
    cancelPayment,
};
