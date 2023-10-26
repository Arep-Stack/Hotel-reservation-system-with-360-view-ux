const userModel = require('../../models/users/userModel');

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.status(200).json(users)
  }catch{
    res.status(500).json({ error: 'An error occurred while fetching all users.' });
  }
}
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id
    const user = await userModel.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the user.' });
  }
};
const getUserByEmail = async (req, res) => {
  try {
    const email = req.params.email
    const user = await userModel.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(Error)
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
    res.status(200).json(user);
  } catch (error) {
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
    res.status(500).json({ error: 'An error occurred while fetching the user.' });
  }
};
module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  putUser,
  deleteUser
};