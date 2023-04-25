const express = require('express');
const router = express.Router();
const courseRoutes = require('../controllers/course');
const { userMiddleware } = require('../middlewares/user');

router.post('/',userMiddleware, courseRoutes.createCourse);
router.get('/:courseId',userMiddleware, courseRoutes.getCourse);
router.patch('/:courseId',userMiddleware, courseRoutes.updateCourse);

module.exports = router;