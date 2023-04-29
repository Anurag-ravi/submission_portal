const Course = require("../models/course");
const User = require("../models/user");

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate({
        path: "courses_enrolled",
        populate: {
          path: "faculties",
        },
      })
      .populate({
        path: "courses_tutoring",
        populate: {
          path: "faculties",
        },
      });
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const joinCourse = async (req, res) => {
  try {
    const { courseId, enrollmentKey } = req.body;
    const user = req.user;
    const course = await Course.findOne({ code: courseId });
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
    const ncourse = await Course.findById(course._id).populate("faculties");
    res.status(200).json({ message: "Course joined", course: ncourse });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getEnrolledCourses = async (req, res) => {
  try {
    const user = req.user;
    const courses = await Course.find({ _id: { $in: user.courses_enrolled } });
    res.status(200).json({ courses });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getTutoringCourses = async (req, res) => {
  try {
    const user = req.user;
    const courses = await Course.find({ _id: { $in: user.courses_tutoring } });
    res.status(200).json({ courses });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const unenrollCourse = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUser = async (req, res) => {
  try {
    const { email, courseId } = req.body;
    const user = await User.findOne({ email }).select("name email roll");
    const course = await Course.findById(courseId);
    if (!course || !user) {
      return res.status(404).json({ message: "Course or User not found" });
    }
    // check if user is faculty of course
    if (course.faculties.includes(user._id)) {
      return res.status(200).json({ user, isTA: true });
    }
    res.status(200).json({ user, isTA: false });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getProfile,
  joinCourse,
  getEnrolledCourses,
  getTutoringCourses,
  unenrollCourse,
  getUser,
};
