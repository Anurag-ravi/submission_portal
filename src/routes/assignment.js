const express = require('express');
const assignmentRoutes = require('../controllers/assignment');
const router = express.Router();
const Course = require('../models/course');
const Assignment = require('../models/assignment');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        const { assignment_id } = req.params;
        const assignment = await Assignment.findById(assignment_id);
        if (!assignment) {
            cb(null,'junk');
        } else {
            const up = "files/" + assignment.course + "/" + assignment_id;
            assignment.file = {
                mimetype : file.mimetype,
                filename : file.originalname,
                path : up
            }
            await assignment.save();
            cb(null, up);
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

var upload = multer({ storage: storage });

router.get('/:courseId', assignmentRoutes.getAllAssignments);
router.post('/:courseId', assignmentRoutes.createAssignment);
router.post('/add/:assignment_id', upload.single('file'), assignmentRoutes.addFile);
router.get('/file/:assignment_id', assignmentRoutes.getAssignmentFile);
router.patch('/:assignment_id', assignmentRoutes.updateAssignment);

module.exports = router;