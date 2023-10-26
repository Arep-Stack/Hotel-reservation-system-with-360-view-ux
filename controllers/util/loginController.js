const userModel = require('../../models/users/userModel');
const bcrypt = require('bcrypt'); 

const loginUser = async (req, res) => {
    try {
      const { EMAIL, PASSWORD } = req.body;
      const user = await userModel.getUserByEmail(EMAIL);
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      const passwordMatch = await bcrypt.compare(PASSWORD, user.PASSWORD);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Incorrect password' });
      }
      res.status(200).json({ user });
    } catch (error) {
      console.error('Error logging in', error);
      res.status(500).json({ error: 'An error occurred while logging in.' });
    }
};
module.exports = {
    loginUser,
};