const db = require('../config/db');
const bcrypt = require('bcrypt'); 

// CREATE USER
const createUser = async (username, email, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *';
    const values = [username, email, hashedPassword];
    const result = await db.query(query, values);

    return result.rows[0];
  } catch (error) {
    console.error('Error creating user', error);
    throw error
  }
};
const getAllUsers = async () => {
    try {
      const query = 'SELECT * FROM users';
      const result = await db.query(query);
  
      return result.rows;
    } catch (error) {
      console.error('Error getting all users', error);
      return error;
    }
};
const getUserById = async (userId) => {
    try {
      const query = 'SELECT * FROM users WHERE user_id = $1';
      const values = [userId];
      const result = await db.query(query, values);
  
      if (result.rows.length === 0) {
        return null; 
      }
  
      return result.rows[0];
    } catch (error) {
      console.error('Error getting user by ID', error);
      throw error;
    }
};
const getUserByEmail = async (email) => {
    try {
      const query = 'SELECT * FROM users WHERE email = $1';
      const values = [email];
      const result = await db.query(query, values);
  
      if (result.rows.length === 0) {
        return null; 
      }
  
      return result.rows[0];
    } catch (error) {
      console.error('Error getting user by email', error);
      throw error;
    }
};
const updateUser = async (userId, newUserData) => {
    try {
      const { username, email, password } = newUserData;

      // Check if the user exists
      const existingUser = await getUserById(userId);

      if (!existingUser) {
        return null; // User not found
      }

       const query = 'UPDATE users SET username = $1, email = $2, password = $3 WHERE user_id = $4 RETURNING *';
       const values = [username, email, password, userId];
       const result = await db.query(query, values);
  
      return result.rows[0];
    } catch (error) {
      console.error('Error getting user by email', error);
      throw error;
    }
};
const deleteUser = async (userId) => {
    try {
      const existingUser = await getUserById(userId);
  
      if (!existingUser) {
        return false; 
      }
  
      const query = 'DELETE FROM users WHERE user_id = $1';
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