const userModel = require('../../models/users/userModel');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const secretKey = 'arepstack';
function authenticateToken(req, res, next) {
    const authorizationHeader  = req.header('Authorization');
    if (!authorizationHeader) return res.status(401).json({ message: 'Access denied' });

    const [prefix, token] = authorizationHeader.split(' ');

    if (prefix !== 'Bearer' || !token) return res.status(401).json({ message: 'Invalid token format' });

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
}
module.exports = {
    authenticateToken
}