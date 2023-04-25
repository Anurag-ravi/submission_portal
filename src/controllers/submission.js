const Assignment = require('../models/assignment');
const Submission = require('../models/submission');
const path = require('path');
const fs = require('fs');

const createSubmission = async (req, res) => {
    const { assignment_id } = req.params;
    const assignment = await Assignment.findById(assignment_id);
    if (!assignment) {
        return res.status(404).json({ message: "Assignment not found" });
    }
    const submission = new Submission({
        assignment: assignment_id,
        student: req.user._id,
        time: Date.now(),
        comment: req.body.comment
    });
    await submission.save();
    assignment.submissions.push(submission._id);
    await assignment.save();
    // create a folder for the submission
    const dir = path.join(__dirname, '../../', 'files', assignment.course.toString(), assignment_id, submission._id);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    res.status(200).json({ submission });
}

const submitFile = async (req, res) => {
    res.json({ message: "File submitted" });
}   

const getSubmissionFile = async (req, res) => {
    const { assignment_id,student_id } = req.body;
    const submission = await Submission.findOne({ assignment: assignment_id, student: student_id });
    if (!submission) {
        return res.status(404).json({ message: "Submission not found" });
    }
    const { file } = submission;
    if (!file) {
        return res.status(404).json({ message: "File not found" });
    }
    const dir = path.join(__dirname, '../../',file.path, file.filename);
    const data = fs.readFileSync(dir);
    res.setHeader('Content-disposition', `attachment; filename=${file.filename}`);
    res.contentType(file.mimetype);
    res.send(data);
}

module.exports = {
    createSubmission,
    submitFile,
    getSubmissionFile
}