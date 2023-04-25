const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/faculty');
const { userMiddleware } = require('../middlewares/user');

router.get('/courses',userMiddleware, facultyController.getAllCourses);
router.post('/add/:courseId',userMiddleware, facultyController.addFacultyToCourse);
router.post('/remove/:courseId',userMiddleware, facultyController.removeFacultyFromCourse);

module.exports = router;