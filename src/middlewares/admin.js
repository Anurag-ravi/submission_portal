const Admin = require('../models/admin');
const { verifyToken } = require('../utilities/admintoken');

const adminMiddleware = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const data = await verifyToken(token);
    if (data.valid) {
        const admin = await Admin.findById(data.admin._id);
        if (!admin) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.admin = admin;
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized', error: data.error });
    }
};

module.exports = { adminMiddleware };
