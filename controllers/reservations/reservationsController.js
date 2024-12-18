const reservationsModel = require('../../models/reservations/reservationsModel');

const postReservation = async (req, res) => {
    const propertiesToValidate = ["USER_ID", "SERVICE_ID", "STATUS", "START_DATE", "END_DATE", "AMOUNT"];
    try {
        const validationMessage = validateRequestProperties(req.body,propertiesToValidate);
        if ( validationMessage === "PASS" ) {
            const newReservation = {
                USER_ID: req.body.USER_ID,
                SERVICE_ID: req.body.SERVICE_ID,
                STATUS: req.body.STATUS,
                DESCRIPTION: req.body.DESCRIPTION,
                START_DATE: req.body.START_DATE,
                END_DATE: req.body.END_DATE,
                AMOUNT: req.body.AMOUNT,
                PAYMENT_HISTORY: req.body.PAYMENT_HISTORY,
                BALANCE: req.body.BALANCE,
                IS_DOWNPAYMENT_PAID: req.body.IS_DOWNPAYMENT_PAID,
                ADDONS: req.body.ADDONS,
                PAX: req.body.PAX,
                FEEDBACK: req.body.FEEDBACK,
                GCASH_PENDING_PAYMENTS: req.body.GCASH_PENDING_PAYMENTS
            }
            const reservation = await reservationsModel.createReservation(newReservation);
            if (reservation.ID) {
                res.status(201).json(reservation);
            } else {
                res.status(500).json({ message: "Something went wrong!" });
            }
        } else {
            res.status(404).json({ message: validationMessage });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while creating the reservation.' });
    }
};
const getAllReservation = async (req, res) => {
    try {
        const reservations = await reservationsModel.getAllReservations();
        res.status(200).json(reservations)
    }catch{
        console.log(error);
        res.status(500).json({ error: 'An error occurred while fetching all reservations.' });
    }
}
const getReservationById = async (req, res) => {
    try {
        const reservationId = req.params.id;
        const reservation = await reservationsModel.getReservationById(reservationId);
        if (!reservation) {
        return res.status(404).json({ error: 'reservation not found' });
        }
        res.status(200).json(reservation);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while fetching the reservation.' });
    }
};
const putReservation = async (req, res) => {
    const reservationId = req.params.id;
    const updatedReservation = {
        USER_ID: req.body.USER_ID,
        SERVICE_ID: req.body.SERVICE_ID,
        STATUS: req.body.STATUS,
        DESCRIPTION: req.body.DESCRIPTION,
        START_DATE: req.body.START_DATE,
        END_DATE: req.body.END_DATE,
        AMOUNT: req.body.AMOUNT,
        BALANCE: req.body.BALANCE,
        PAYMENT_HISTORY: req.body.PAYMENT_HISTORY,
        IS_DOWNPAYMENT_PAID: req.body.IS_DOWNPAYMENT_PAID,
        ADDONS: req.body.ADDONS,
        PAX: req.body.PAX,
        FEEDBACK: req.body.FEEDBACK,
        GCASH_PENDING_PAYMENTS: req.body.GCASH_PENDING_PAYMENTS
    };
    try {
        const reservation = await reservationsModel.updateReservation(reservationId, updatedReservation);
        res.status(200).json(reservation);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while updating the reservation.' });
    }
};
const deleteReservation = async (req, res) => {
    try {
        const reservationId = req.params.id; 
        const deleteReservation = await reservationsModel.deleteReservation(reservationId);
        if (!deleteReservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        } else {
            res.status(200).json({ message: `ID ${reservationId} is succesfully deleted` });
        }        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while deleting the reservation.' });
    }
};
function validateRequestProperties(requestBody, properties) {
    for ( const property of properties ) {
        if ( !requestBody[property] || requestBody[property] === "" ) {
            return `${property} is empty or undefined.`;
        } 
    }
    return "PASS";
}
module.exports = {
    postReservation,
    getAllReservation,
    getReservationById,
    putReservation,
    deleteReservation
}