const User = require('../models/user');
const { verifyToken } = require('../utilities/usertoken');

const userMiddleware = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Token not found' });
    }
    const data = await verifyToken(token);
    if (data.valid) {
        const user = await User.findById(data.user._id);
        if (!user) {
          return res.status(401).json({ message: 'user Dont exist' });
        }
        req.user = user;
        next();
    } else {
    return res.status(401).json({ message: 'Unauthorized', error: data.error });
    }
}

module.exports = {
    userMiddleware
}