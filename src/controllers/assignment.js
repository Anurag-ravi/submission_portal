const User = require('../models/user');
const Assignment = require('../models/assignment');
const Course = require('../models/course');
const path = require('path');
const fs = require('fs');

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
    res.contentType(file.mimetype);
    res.send(data);
}

module.exports = {
    getAllAssignments,
    createAssignment,
    addFile,
    getAssignmentFile
}