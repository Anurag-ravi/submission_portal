const Submission = require('../models/submission');
const Feedback = require('../models/feedback');

const createFeedback = async (req, res) => {
    const { submission_id } = req.params;
    const submission = await Submission.findById(submission_id);
    if (!submission) {
        return res.status(404).json({ message: "Submission not found" });
    }
    const feedback = new Feedback({
        submission: submission_id,
        faculty: req.user._id,
        time: Date.now(),
        comment: req.body.comment,
        marks: req.body.marks
    });
    await feedback.save();
    submission.feedback = feedback._id;
    await submission.save();
    res.status(200).json({ feedback });
}

const getFeedback = async (req, res) => {
    const { submission_id } = req.params;
    const feedback = await Feedback.findOne({ submission: submission_id });
    if (!feedback) {
        return res.status(404).json({ message: "Feedback not found" });
    }
    res.status(200).json({ feedback });
}

const updateFeedback = async (req, res) => {
    const { submission_id } = req.params;
    const feedback = await Feedback.findOne({ submission: submission_id });
    if (!feedback) {
        return res.status(404).json({ message: "Feedback not found" });
    }
    feedback.comment = req.body.comment || feedback.comment;
    feedback.marks = req.body.marks || feedback.marks;
    feedback.time = Date.now();
    await feedback.save();
    res.status(200).json({ feedback });
}

module.exports = {
    createFeedback,
    getFeedback,
    updateFeedback
}