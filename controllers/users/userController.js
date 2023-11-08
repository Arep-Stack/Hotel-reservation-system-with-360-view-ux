const userModel = require('../../models/users/userModel');

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    const sanitizedUsers = users.map(user => sanitizeUser(user));
    res.status(200).json(sanitizedUsers)
  }catch{
    console.log(error);
    res.status(500).json({ error: 'An error occurred while fetching all users.' });
  }
}
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userModel.getUserById(userId);
    const sanitizedUsers = users.map(user => sanitizeUser(user));
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(sanitizedUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while fetching the user.' });
  }
};
const getUserByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await userModel.getUserByEmail(email);
    const sanitizedUser = sanitizeUser(user);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(sanitizedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while fetching the user.' });
  }
};
const putUser = async (req, res) => {
  const userId = req.params.id;
  const updatedUser = {
    FIRSTNAME: req.body.FIRSTNAME,
    LASTNAME: req.body.LASTNAME,
    EMAIL: req.body.EMAIL,
    PHONE_NUMBER: req.body.PHONE_NUMBER,
    ADDRESS: req.body.ADDRESS,
    PASSWORD: req.body.PASSWORD,
  };
  try {
    const user = await userModel.updateUser(userId, updatedUser);
    const sanitizedUser = sanitizeUser(user);
    res.status(200).json(sanitizedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while updating the user.' });
  }
};
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id; 
    const deleteUser = await userModel.deleteUser(userId);
    if (!deleteUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(deleteUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while fetching the user.' });
  }
};
function sanitizeUser(user) {
  const sanitizedUser = {
    ID: user.ID,
    FIRSTNAME: user.FIRSTNAME,
    EMAIL: user.EMAIL,
    PHONE_NUMBER: user.PHONE_NUMBER,
    IS_ADMIN: user.IS_ADMIN,
    IS_ACTIVE: user.IS_ACTIVE
  };
  return sanitizedUser;
}
module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  putUser,
  deleteUser
};