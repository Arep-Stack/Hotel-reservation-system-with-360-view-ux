const userModel = require('../models/userModel');

//POST
const postUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await userModel.createUser(username, email, password);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the user.' });
  }
};

// SINGLE GET
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching all users.' });
  }
};
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
    res.status(500).json({ error: 'An error occurred while fetching the user.' });
  }
};
const putUser = async (req, res) => {
  try {
    const userId = req.params.id; 
    const newUserData = req.body;

    const updatedUser = await userModel.updateUser(userId, newUserData);
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the user.' });
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
  postUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  putUser,
  deleteUser
};