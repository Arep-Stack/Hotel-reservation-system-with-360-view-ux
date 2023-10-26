const userModel = require('../../models/users/userModel');
const bcrypt = require('bcrypt'); 

const registerUser = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.PASSWORD, 10);
    const newUser = {
        FIRSTNAME: req.body.FIRSTNAME,
        LASTNAME: req.body.LASTNAME,
        EMAIL: req.body.EMAIL,
        PHONE_NUMBER: req.body.PHONE_NUMBER,
        ADDRESS: req.body.ADDRESS,
        PASSWORD: hashedPassword
      }
      try {
        const user = await userModel.createUser(newUser);
        res.status(201).json(user);
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while registering the user.' });
      }
};
module.exports = {
    registerUser,
};