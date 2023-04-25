const jwt = require('jsonwebtoken');
const config = require('../config/config');
const Admin = require('../models/admin');

const generateToken = (admin) => {
    const payload = {
        email: admin.email
    };
    return jwt.sign(payload, config.JWT_SECRET, { expiresIn: '1h' });
};

const verifyToken = async (token) => {
    try {
        var decoded = jwt.verify(token, config.JWT_SECRET);
        var email = decoded.email;
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return { error: 'Admin not found', admin: null, valid: false };
        }
        return { error: null, admin: admin, valid: true };
    } catch (err) {
        return { error: err, admin: null, valid: false };
    }
};

module.exports = {
    generateToken,
    verifyToken
};
