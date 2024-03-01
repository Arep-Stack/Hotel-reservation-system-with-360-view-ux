const db = require('../../config/db');

const createServices = async (newService) => {
    try {
        const query = `
        INSERT INTO "SERVICES" 
        ("NAME", "TYPE", "QUANTITY", "PRICE", "IMAGE", "PERSONS", "AMENITIES", "MAIN360", "OTHER360", "IS_DELETED") 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
        RETURNING *
        `;
        const values = [
            newService.NAME, 
            newService.TYPE, 
            newService.QUANTITY, 
            newService.PRICE, 
            newService.IMAGE, 
            newService.PERSONS, 
            newService.AMENITIES,
            newService.MAIN360,
            newService.OTHER360,
            newService.IS_DELETED
        ];
        const result = await db.one(query, values);
        return result;
    } catch (error) {
        console.error('Error creating service', error);
        throw error;
    }
};
async function getAllServices() {
    try {
        const query = `SELECT * FROM "SERVICES"`;
        const services = await db.any(query);
        return services;
    } catch (error) {
        throw error;
    }
}
const getServiceById = async (serviceId) => {
    try {
        const query = `
        SELECT * FROM "SERVICES" 
        WHERE "ID" = $1
        `;
        const values = [serviceId];
        const result = await db.oneOrNone(query, values);
        return result
    } catch (error) {
        throw error;
    }
};
const updateServices = async (serviceId, updatedService) => {
    try {
        const query = `
            UPDATE "SERVICES"
            SET "NAME" = COALESCE($1, "NAME"),
                "TYPE" = COALESCE($2, "TYPE"),
                "QUANTITY" = COALESCE($3, "QUANTITY"),
                "PRICE" = COALESCE($4, "PRICE"),
                "IMAGE" = COALESCE($5, "IMAGE"),
                "PERSONS" = COALESCE($6, "PERSONS"),
                "AMENITIES" = COALESCE($7, "AMENITIES"),
                "MAIN360" = COALESCE($8, "MAIN360"),
                "OTHER360" = COALESCE($9, "OTHER360"),
                "IS_DELETED" = COALESCE($10, "IS_DELETED")
            WHERE "ID" = $11
            RETURNING *
        `;
        const values = [
            updatedService.NAME,
            updatedService.TYPE,
            updatedService.QUANTITY,
            updatedService.PRICE,
            updatedService.IMAGE,
            updatedService.PERSONS,
            updatedService.AMENITIES,
            updatedService.MAIN360,
            updatedService.OTHER360,
            updatedService.IS_DELETED,
            serviceId
        ];
        const result = await db.one(query, values);
        return result;
    } catch (error) {
        throw error;
    }
};
const deleteServices = async (serviceId) => {
    try {
      const existingService = await getServiceById(serviceId);
      if (!existingService) {
        return false; 
      }
      const query = `DELETE FROM "SERVICES" WHERE "ID" = $1`;
      const values = [serviceId];
      await db.query(query, values);
      return true; 
    } catch (error) {
      console.error('Error deleting service', error);
      throw error;
    }
  };
module.exports = {
    createServices,
    getAllServices,
    getServiceById,
    updateServices,
    deleteServices
}