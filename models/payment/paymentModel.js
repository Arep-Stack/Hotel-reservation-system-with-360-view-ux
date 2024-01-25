const db = require('../../config/db');

const createPayment = async (newPayment) => {
    try {
        const query = `
        INSERT INTO "PAYMENTS" 
        ("PAYMENT_CODE", "USER_ID", "TYPE", "CONTENT") 
        VALUES ($1, $2, $3, $4) 
        RETURNING *
        `;
        const values = [
            newPayment.PAYMENT_CODE, 
            newPayment.USER_ID, 
            newPayment.TYPE, 
            newPayment.CONTENT
        ];
        const result = await db.one(query, values);
        return result;
    } catch (error) {
        console.error('Error creating payment', error);
        throw error;
    }
};
async function getAllPayments() {
    try {
        const query = `SELECT * FROM "PAYMENTS"`;
        const payments = await db.any(query);
        return payments;
    } catch (error) {
        throw error;
    }
}
const getPaymentById = async (paymentId) => {
    try {
        const query = `
        SELECT * FROM "PAYMENTS" 
        WHERE "ID" = $1
        `;
        const values = [paymentId];
        const result = await db.oneOrNone(query, values);
        return result
    } catch (error) {
        throw error;
    }
};
const updatePayment = async (paymentId, updatePayment) => {
    try {
        const query = `
            UPDATE "PAYMENTS"
            SET "PAYMENT_CODE" = COALESCE($1, "PAYMENT_CODE"),
                "USER_ID" = COALESCE($2, "USER_ID"),
                "TYPE" = COALESCE($3, "TYPE"),
                "CONTENT" = COALESCE($4, "CONTENT")
            WHERE "ID" = $5
            RETURNING *
        `;
        const values = [
            updatePayment.PAYMENT_CODE,
            updatePayment.USER_ID,
            updatePayment.TYPE,
            updatePayment.CONTENT,
            paymentId
        ];
        const result = await db.one(query, values);
        return result;
    } catch (error) {
        throw error;
    }
};
const deletePayment = async (paymentId) => {
    try {
      const existingPayment = await getPaymentById(paymentId);
      if (!existingPayment) {
        return false; 
      }
      const query = `DELETE FROM "PAYMENTS" WHERE "ID" = $1`;
      const values = [paymentId];
      await db.query(query, values);
      return true; 
    } catch (error) {
      console.error('Error deleting payment', error);
      throw error;
    }
  };
module.exports = {
    createPayment,
    getAllPayments,
    getPaymentById,
    updatePayment,
    deletePayment
}