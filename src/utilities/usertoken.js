const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/user');

const generateToken = (user) => {
    const payload = {
        email: user.email
    };
    return jwt.sign(payload, config.JWT_SECRET, { expiresIn: '10d' });
};

const verifyToken = async (token) => {
    try {
        var decoded = jwt.verify(token, config.JWT_SECRET);
        var email = decoded.email;
        const user = await User.findOne({ email });
        if (!user) {
            return { error: 'User not found', user: null, valid: false };
        }
        return { error: null, user: user, valid: true };
    } catch (err) {
        return { error: err, user: null, valid: false };
    }
};

module.exports = {
    generateToken,
    verifyToken
};