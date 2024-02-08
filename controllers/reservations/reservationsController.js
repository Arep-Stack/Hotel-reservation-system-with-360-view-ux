const reservationsModel = require('../../models/reservations/reservationsModel');

const postReservation = async (req, res) => {
    const propertiesToValidate = ["USER_ID", "SERVICE_ID", "STATUS", "START_DATE", "END_DATE", "AMOUNT", "BALANCE"];
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
                BALANCE: req.body.BALANCE
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
        AMENITY_ID: req.body.AMENITY_ID,
        PAYMENT_ID: req.body.PAYMENT_ID,
        DESCRIPTION: req.body.DESCRIPTION,
        BALANCE: req.body.BALANCE
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