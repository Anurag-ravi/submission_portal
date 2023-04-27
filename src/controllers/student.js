const Course = require('../models/course');
const User = require('../models/user');

const getProfile = async (req, res) => {
    const user = await User.findById(req.user._id)
    .populate({
        path : 'courses_enrolled',
        populate : {
            path : 'faculties'
        }
    })
    .populate({
        path : 'courses_tutoring',
        populate : {
            path : 'faculties'
        }
    });
    res.status(200).json({ user });
}

const joinCourse = async (req, res) => {
    const { courseId, enrollmentKey } = req.body;
    const user = req.user;
    const course = await Course.findOne({ code : courseId });
    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }
    if (course.enrolment_key !== enrollmentKey) {
        return res.status(400).json({ message: "Invalid enrollment key" });
    }
    user.courses_enrolled.push(course._id);
    await user.save();
    course.students.push(user._id);
    await course.save();
    const ncourse = await Course.findById(course._id).populate('faculties');
    res.status(200).json({ message: "Course joined", course: ncourse });
}

const getEnrolledCourses = async (req, res) => {
    const user = req.user;
    const courses = await Course.find({ _id: { $in: user.courses_enrolled } });
    res.status(200).json({ courses });
}

const getTutoringCourses = async (req, res) => {
    const user = req.user;
    const courses = await Course.find({ _id: { $in: user.courses_tutoring } });
    res.status(200).json({ courses });
}

const unenrollCourse = async (req, res) => {
    const { courseId } = req.params;
    const user = req.user;
    const course = await Course.findById(courseId);
    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }
    user.courses_enrolled.pull(courseId);
    await user.save();
    course.students.pull(user._id);
    await course.save();
    res.status(200).json({ message: "Course unenrolled" });
}

module.exports = {
    getProfile,
    joinCourse,
    getEnrolledCourses,
    getTutoringCourses,
    unenrollCourse
}