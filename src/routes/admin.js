const express = require('express');
const adminRoutes = require('../controllers/admin');
const { adminMiddleware } = require('../middlewares/admin');
const router = express.Router();

router.post('/login', adminRoutes.login);
router.post('/register', adminRoutes.register);
router.post('/change-password', adminMiddleware, adminRoutes.changePassword);
router.get('/get-admin', adminMiddleware, adminRoutes.getAdmin);
router.get('/get-users', adminMiddleware, adminRoutes.getAllUsers);
router.get('/add/:userId', adminMiddleware, adminRoutes.makeUserFaculty);
router.get('/remove/:userId', adminMiddleware, adminRoutes.removeUserFaculty);
router.post('/make-new-admin', adminMiddleware, adminRoutes.makeNewAdmin);
router.post('/get',adminMiddleware,adminRoutes.getUser)

module.exports = router;