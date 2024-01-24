const paymentsModel = require('../../models/payment/paymentModel');

const getAllPayments = async (req, res) => {
    try {
        const payments = await paymentsModel.getAllPayments();
        res.status(200).json(payments)
    }catch{
        console.log(error);
        res.status(500).json({ error: 'An error occurred while fetching all payments.' });
    }
}
const getPaymentById = async (req, res) => {
    try {
        const paymentId = req.params.id;
        const payment = await paymentsModel.getPaymentById(paymentId);
        if (!payment) {
        return res.status(404).json({ error: 'payment not found' });
        }
        res.status(200).json(payment);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while fetching the payment.' });
    }
};
const putPayment = async (req, res) => {
    const paymentId = req.params.id;
    const updatedPayment = {
        PAYMENT_CODE: req.body.PAYMENT_CODE,
        USER_ID: req.body.USER_ID,
        TYPE: req.body.TYPE,
        CONTENT: req.body.CONTENT
    };
    try {
        const payment = await paymentsModel.updatePayment(paymentId, updatedPayment);
        res.status(200).json(payment);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while updating the payment.' });
    }
};
const deletePayment = async (req, res) => {
    try {
        const paymentId = req.params.id; 
        const deletePayment = await paymentsModel.deletePayment(paymentId);
        if (!deletePayment) {
            return res.status(404).json({ error: 'Payment not found' });
        } else {
            res.status(200).json({ message: `ID ${paymentId} is succesfully deleted` });
        }        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while deleting the payment.' });
    }
};
module.exports = {
    getAllPayments,
    getPaymentById,
    putPayment,
    deletePayment
}