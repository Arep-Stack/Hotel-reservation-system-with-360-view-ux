const db = require('../../config/db');

const createAmenity = async (newAmenity) => {
    try {
        const query = `
        INSERT INTO "AMENITIES" 
        ("NAME", "TYPE", "QUANTITY", "PRICE", "DESCRIPTION") 
        VALUES ($1, $2, $3, $4, $5) 
        RETURNING *
        `;
        const values = [
        newAmenity.NAME, 
        newAmenity.TYPE, 
        newAmenity.QUANTITY, 
        newAmenity.PRICE, 
        newAmenity.DESCRIPTION
        ];
        const result = await db.one(query, values);
        return result;
    } catch (error) {
        console.error('Error creating amenity', error);
        throw error;
    }
};
async function getAllAmenities() {
    try {
        const query = `SELECT * FROM "AMENITIES"`;
        const amenities = await db.any(query);
        return amenities;
    } catch (error) {
        throw error;
    }
}
const getAmenityById = async (amenityId) => {
    try {
        const query = `
        SELECT * FROM "AMENITIES" 
        WHERE "ID" = $1
        `;
        const values = [amenityId];
        const result = await db.oneOrNone(query, values);
        return result
    } catch (error) {
        throw error;
    }
};
const updateAmenity = async (amenityId, updatedAmenity) => {
    try {
        const query = `
            UPDATE "AMENITIES"
            SET "NAME" = COALESCE($1, "NAME"),
                "TYPE" = COALESCE($2, "TYPE"),
                "QUANTITY" = COALESCE($3, "QUANTITY"),
                "PRICE" = COALESCE($4, "PRICE"),
                "DESCRIPTION" = COALESCE($5, "DESCRIPTION")
            WHERE "ID" = $6
            RETURNING *
        `;
        const values = [
        updatedAmenity.NAME,
        updatedAmenity.TYPE,
        updatedAmenity.QUANTITY,
        updatedAmenity.PRICE,
        updatedAmenity.DESCRIPTION,
        amenityId
        ];
        const result = await db.one(query, values);
        return result;
    } catch (error) {
        throw error;
    }
};
const deleteAmenity = async (amenityId) => {
    try {
      const existingAmenity = await getAmenityById(amenityId);
      if (!existingAmenity) {
        return false; 
      }
      const query = `DELETE FROM "AMENITIES" WHERE "ID" = $1`;
      const values = [amenityId];
      await db.query(query, values);
      return true; 
    } catch (error) {
      console.error('Error deleting amenity', error);
      throw error;
    }
  };
module.exports = {
    createAmenity,
    getAllAmenities,
    getAmenityById,
    updateAmenity,
    deleteAmenity
}