const facultyMiddleware = (req, res, next) => {
    if(req.user.is_faculty) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = facultyMiddleware;