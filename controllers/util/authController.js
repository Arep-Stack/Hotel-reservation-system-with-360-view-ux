const userModel = require('../../models/users/userModel');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const secretKey = 'arepstack';
const authenticate = async (req, res) => {
    try {
        const { EMAIL, PASSWORD } = req.body;
        const user = await userModel.getUserByEmail(EMAIL);
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        } else{
            const passwordMatch = await bcrypt.compare(PASSWORD, user.PASSWORD);
            if (!passwordMatch) {
                return res.status(401).json({ error: 'Incorrect password' });
            } else {
                const accessToken = jwt.sign({ EMAIL }, secretKey, { expiresIn: '1h' });
                res.status(201).json({ accessToken });
            }
        }
    } catch (error) {
        console.error('Error Generating Access Token', error);
        res.status(500).json({ error: 'Error Generating Access Token.' });
    }
};
function authenticateToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access denied' });

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
}
module.exports = {
    authenticate,
    authenticateToken
}