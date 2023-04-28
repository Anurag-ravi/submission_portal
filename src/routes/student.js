const express = require('express');
const router = express.Router();
const { userMiddleware } = require('../middlewares/user');
const studentController = require('../controllers/student');

router.get('/profile', userMiddleware, studentController.getProfile);
router.post('/join', userMiddleware, studentController.joinCourse);
router.get('/enrolled', userMiddleware, studentController.getEnrolledCourses);
router.get('/tutoring', userMiddleware, studentController.getTutoringCourses);
router.delete('/unenroll/:courseId', userMiddleware, studentController.unenrollCourse);
router.post('/get', userMiddleware, studentController.getUser);

module.exports = router;