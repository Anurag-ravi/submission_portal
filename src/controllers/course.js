const User = require("../models/user");
const Course = require("../models/course");
const path = require("path");
const fs = require("fs");

const createCourse = async (req, res) => {
  try {
    const { name, code, description } = req.body;
    if (!name || !code) {
      return res.status(400).json({ message: "Invalid data" });
    }
    var faculty = req.user;
    var course = await Course.findOne({ code });
    if (course) {
      return res.status(409).json({ message: "Course already exists" });
    }
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomString = "";
    for (let i = 0; i < 10; i++) {
      randomString += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    while (true) {
      course = await Course.findOne({ enrolment_key: randomString });
      if (!course) {
        break;
      }
      randomString = "";
      for (let i = 0; i < 10; i++) {
        randomString += chars.charAt(Math.floor(Math.random() * chars.length));
      }
    }
    course = new Course({
      name,
      code,
      description,
      enrolment_key: randomString,
      faculties: [faculty._id],
    });
    await course.save();
    faculty.courses_tutoring.push(course._id);
    await faculty.save();
    // create a folder for the course
    const dir = path.join(__dirname, "../../", "files", course._id.toString());
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    res.status(201).json({ course });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId)
      .populate("faculties")
      .populate("students")
      .populate("assignments");
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ course });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { name, code, description } = req.body;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    course.name = name || course.name;
    course.code = code || course.code;
    course.description = description || course.description;
    await course.save();
    res.status(200).json({ course });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createCourse,
  getCourse,
  updateCourse,
};
