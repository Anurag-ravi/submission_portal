const Submission = require('../models/submission');
const Feedback = require('../models/feedback');
const sendEmail = require('../config/email');

const createFeedback = async (req, res) => {
    const { submission_id } = req.params;
    const submission = await Submission.findById(submission_id)
    .populate({
        path: 'assignment',
        select: 'name course total_marks',
        populate: {
            path: 'course',
            select: 'code'
        }
    })
    .populate({
        path: 'student',
        select: 'name email'
    });
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
    const nf = await Feedback.findById(feedback._id).populate('faculty');
        const subject = "Feedback for " + submission.assignment.name;
        const html = `
                <div style="font-family: Arial, sans-serif; background-color: #f2f2f2; padding: 20px;">
                <h1 style="color: #333333;">Dear ${submission.student.name},</h1>
                <p style="color: #666666; font-size: 18px;">Your ${submission.assignment.name} in Course ${submission.assignment.course.code} has been graded and you have received a score of <strong>${feedback.marks}/${submission.assignment.total_marks}</strong>.</p>
                <p style="color: #666666; font-size: 18px;">Thank you for your submission.</p>
                <div style="background-color: #ffffff; border: 1px solid #e6e6e6; border-radius: 10px; padding: 20px;">
                    <p style="color: #666666; font-size: 18px;">Regards,</p>
                    <p style="color: #666666; font-size: 18px;">${nf.faculty.name}</p>
                    <p style="color: #666666; font-size: 16px;">${nf.faculty.email}</p>
                </div>
            </div>`;
    let recipients = [submission.student.email];
    Promise.all(recipients.map((recipient) => sendEmail(recipient, subject, html)));
    res.status(200).json({ feedback:nf });
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