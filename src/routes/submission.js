const express = require('express');
const submissionController = require('../controllers/submission');
const router = express.Router();
const Assignment = require('../models/assignment');
const Submission = require('../models/submission');
const multer = require('multer');
const { userMiddleware } = require('../middlewares/user');
const storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        const { submission_id } = req.params;
        const submission = await Submission.findById(submission_id);
        if (!submission) {
            req.submitted = false;
            cb(null,'junk');
        } else {
            const assignment = await Assignment.findById(submission.assignment);
            const up = "files/" + assignment.course + "/" + assignment._id + "/" + submission._id;
            console.log(up, typeof(up));
            submission.file = {
                mimetype : file.mimetype,
                filename : file.originalname,
                path : up
            }
            await submission.save();
            req.submitted = true;
            cb(null, up);
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

var upload = multer({ storage: storage });

router.post('/:assignment_id', userMiddleware ,submissionController.createSubmission);
router.post('/add/:submission_id',userMiddleware , upload.single('file'), submissionController.submitFile);
router.get('/file/:submission_id', submissionController.getSubmissionFile);
router.get('/check/:assignment_id',userMiddleware , submissionController.checkSubmission);

module.exports = router;
            