const db = require('../../config/db');

// CREATE USER
const createUser = async (newUser) => {
  try {
    const query = `
    INSERT INTO "USERS" 
    ("FIRSTNAME", "LASTNAME", "EMAIL", "PHONE_NUMBER", "ADDRESS", "PASSWORD") 
    VALUES ($1, $2, $3, $4, $5, $6) 
    RETURNING *`;
    const values = [
      newUser.FIRSTNAME, 
      newUser.LASTNAME, 
      newUser.EMAIL, 
      newUser.PHONE_NUMBER, 
      newUser.ADDRESS, 
      newUser.PASSWORD
    ];
    const result = await db.one(query, values);
    return result;
  } catch (error) {
    console.error('Error creating user', error);
    throw error;
  }
};
async function getAllUsers() {
  try {
    const query = `SELECT * FROM "USERS"`;
    const users = await db.any(query);
    return users;
  } catch (error) {
    throw error;
  }
}
const getUserById = async (userId) => {
    try {
      const query = `
      SELECT * FROM "USERS" 
      WHERE "ID" = $1`;
      const values = [userId];
      const result = await db.oneOrNone(query, values);
      return result
    } catch (error) {
      throw error;
    }
};
const getUserByEmail = async (email) => {
    try {
      const query = `
      SELECT * FROM "USERS" 
      WHERE "EMAIL" = $1`;
      const values = [email];
      const result = await db.oneOrNone(query, values);
      return result
    } catch (error) {
      throw error;
    }
};
const updateUser = async (userId, updatedUser) => {
    try {
      const query = `
      UPDATE "USERS"
      SET "FIRSTNAME" = $1, "LASTNAME" = $2, "EMAIL" = $3, "PHONE_NUMBER" = $4, "ADDRESS" = $5, "PASSWORD" = $6
      WHERE "ID" = $7
      RETURNING *
    `;
    const values = [
      updatedUser.FIRSTNAME,
      updatedUser.LASTNAME,
      updatedUser.EMAIL,
      updatedUser.PHONE_NUMBER,
      updatedUser.ADDRESS,
      updatedUser.PASSWORD,
      userId,
    ];

    const result = await db.one(query, values);
    return result;
    } catch (error) {
      throw error;
    }
};
const deleteUser = async (userId) => {
    try {
      const existingUser = await getUserById(userId);
      if (!existingUser) {
        return false; 
      }
      const query = `DELETE FROM "USERS" WHERE "ID" = $1`;
      const values = [userId];
      await db.query(query, values);
      return true; 
    } catch (error) {
      console.error('Error deleting user', error);
      throw error;
    }
  };
module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    getUserByEmail,
    updateUser,
    deleteUser
};