const User = require("../models/user");
const Course = require("../models/course");

const getAllCourses = async (req, res) => {
  try {
    const faculty = await req.user.populate("courses_tutoring");
    res.status(200).json({ courses: faculty.courses_tutoring });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const addFacultyToCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { facultyId } = req.body;
    if (!facultyId) {
      return res.status(400).json({ message: "Invalid data" });
    }
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    const faculty = await User.findById(facultyId);
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }
    // if faculty is already added to the course
    if (course.faculties.includes(faculty._id)) {
      return res
        .status(409)
        .json({ message: "Faculty already added to the course" });
    }
    course.faculties.push(faculty._id);
    await course.save();
    faculty.courses_tutoring.push(course._id);
    await faculty.save();
    res.status(200).json({ course });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const removeFacultyFromCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { facultyId } = req.body;
    if (!facultyId) {
      return res.status(400).json({ message: "Invalid data" });
    }
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    const faculty = await User.findById(facultyId);
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }
    course.faculties = course.faculties.filter(
      (faculty) => faculty._id != facultyId
    );
    await course.save();
    faculty.courses_tutoring = faculty.courses_tutoring.filter(
      (course) => course._id != courseId
    );
    await faculty.save();
    res.status(200).json({ course });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllCourses,
  addFacultyToCourse,
  removeFacultyFromCourse,
};
