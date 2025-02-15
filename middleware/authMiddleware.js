const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(403).json({ message: 'Access denied' });

    try {
        const verified = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
}

module.exports = verifyToken;
