const express = require('express');
const submissionController = require('../controllers/submission');
const router = express.Router();
const Assignment = require('../models/assignment');
const Submission = require('../models/submission');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        const { submission_id } = req.params;
        const submission = await Submission.findById(submission_id);
        if (!submission) {
            cb(null,'junk');
        } else {
            const assignment = await Assignment.findById(submission.assignment);
            const up = "files/" + assignment.course + "/" + assignment._id + "/" + submission._id;
            submission.file = {
                mimetype : file.mimetype,
                filename : file.originalname,
                path : up
            }
            await submission.save();
            cb(null, up);
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

var upload = multer({ storage: storage });

router.post('/:assignment_id', submissionController.createSubmission);
router.post('/add/:submission_id', upload.single('file'), submissionController.submitFile);
router.get('/file/:submission_id', submissionController.getSubmissionFile);

module.exports = router;
            