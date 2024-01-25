const db = require('../../config/db');

const createReservation = async (newReservation) => {
    try {
        const query = `
        INSERT INTO "RESERVATIONS" 
        ("USER_ID", "AMENITY_ID", "PAYMENT_ID", "DESCRIPTION") 
        VALUES ($1, $2, $3, $4) 
        RETURNING *
        `;
        const values = [
            newReservation.USER_ID, 
            newReservation.AMENITY_ID, 
            newReservation.PAYMENT_ID, 
            newReservation.DESCRIPTION
        ];
        const result = await db.one(query, values);
        return result;
    } catch (error) {
        console.error('Error creating reservation', error);
        throw error;
    }
};
async function getAllReservations() {
    try {
        const query = `SELECT * FROM "RESERVATIONS"`;
        const reservations = await db.any(query);
        return reservations;
    } catch (error) {
        throw error;
    }
}
const getReservationById = async (serviceId) => {
    try {
        const query = `
        SELECT * FROM "RESERVATIONS" 
        WHERE "ID" = $1
        `;
        const values = [serviceId];
        const result = await db.oneOrNone(query, values);
        return result
    } catch (error) {
        throw error;
    }
};
const updateReservation = async (reservationId, updatereservation) => {
    try {
        const query = `
            UPDATE "RESERVATIONS"
            SET "USER_ID" = COALESCE($1, "USER_ID"),
                "SERVICE_ID" = COALESCE($2, "SERVICE_ID"),
                "STATUS" = COALESCE($3, "STATUS"),
                "DESCRIPTION" = COALESCE($4, "DESCRIPTION"),
                "START_DATE" = COALESCE($5, "START_DATE"),
                "END_DATE" = COALESCE($6, "END_DATE"),
                "AMOUNT" = COALESCE($7, "AMOUNT")
            WHERE "ID" = $8
            RETURNING *
        `;
        const values = [
            updatereservation.USER_ID,
            updatereservation.SERVICE_ID,
            updatereservation.STATUS,
            updatereservation.DESCRIPTION,
            updatereservation.START_DATE,
            updatereservation.END_DATE,
            updatereservation.AMOUNT,
            reservationId
        ];
        const result = await db.one(query, values);
        return result;
    } catch (error) {
        throw error;
    }
};
const deleteReservation = async (reservationId) => {
    try {
      const existingReservation = await getReservationById(reservationId);
      if (!existingReservation) {
        return false; 
      }
      const query = `DELETE FROM "RESERVATIONS" WHERE "ID" = $1`;
      const values = [reservationId];
      await db.query(query, values);
      return true; 
    } catch (error) {
      console.error('Error deleting reservation', error);
      throw error;
    }
  };
module.exports = {
    createReservation,
    getAllReservations,
    getReservationById,
    updateReservation,
    deleteReservation
}