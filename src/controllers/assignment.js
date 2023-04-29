const Assignment = require('../models/assignment');
const Course = require('../models/course');
const path = require('path');
const fs = require('fs');
const cron = require('node-cron');
const { notifyStudent, notifyTA, remindStudent } = require('../utilities/email');

const getAllAssignments = async (req, res) => {
    const { courseId } = req.params;
    const assignments = await Assignment.find({ course: courseId });
    res.status(200).json({ assignments });
}

const createAssignment = async (req, res) => {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);
    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }
    const { name, description, due_date, total_marks } = req.body;
    const assignment = new Assignment({ 
        name, 
        description, 
        due_date, 
        course: courseId,
        total_marks
    });
    await assignment.save();
    course.assignments.push(assignment._id);
    await course.save();
    // create a folder for the assignment
    const dir = path.join(__dirname, '../../', 'files', courseId, assignment._id.toString());
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }


    // notifications part
    notifyStudent(assignment._id);
    // cron job to remind TA when the due date time is reached
    const date = new Date(due_date);
    const cronString = `${date.getMinutes()} ${date.getHours()} ${date.getDate()} ${date.getMonth()+1} *`;
    cron.schedule(cronString, () => {
        notifyTA(assignment._id);
    });
    // cron job to remind Students 24 hours before the due date time
    const date2 = new Date(due_date);
    date2.setHours(date2.getHours() - 24);
    const cronString2 = `${date2.getMinutes()} ${date2.getHours()} ${date2.getDate()} ${date2.getMonth()+1} *`;
    cron.schedule(cronString2, () => {
        remindStudent(assignment._id);
    });
    // end of notifications part

    res.status(200).json({ assignment });
}

const addFile = async (req, res) => {
    res.json({ message: "File added" });
}

const getAssignmentFile = async (req, res) => {
    const { assignment_id } = req.params;
    const assignment = await Assignment.findById(assignment_id);
    if (!assignment) {
        return res.status(404).json({ message: "Assignment not found" });
    }
    const { file } = assignment;
    if (!file) {
        return res.status(404).json({ message: "File not found" });
    }
    const dir = path.join(__dirname, '../../',file.path, file.filename);
    const data = fs.readFileSync(dir);
    res.setHeader('Content-disposition', `attachment; filename=${file.filename}`);
    res.contentType(file.mimetype);
    res.send(data);
}

const updateAssignment = async (req, res) => {
    const { assignment_id } = req.params;
    const assignment = await Assignment.findById(assignment_id);
    if (!assignment) {
        return res.status(404).json({ message: "Assignment not found" });
    }
    const { name, description, due_date, total_marks } = req.body;
    assignment.name = name || assignment.name;
    assignment.description = description || assignment.description;
    assignment.due_date = due_date || assignment.due_date;
    assignment.total_marks = total_marks || assignment.total_marks;
    await assignment.save();
    res.status(200).json({ assignment });
}

module.exports = {
    getAllAssignments,
    createAssignment,
    addFile,
    getAssignmentFile,
    updateAssignment
}