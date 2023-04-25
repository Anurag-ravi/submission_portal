const mongoose = require("mongoose");

const Course_Schema = mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    enrolment_key: { type: String, required: true, unique: true },
    faculties: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Assignment" }],
  },
  { versionKey: false }
);

module.exports = mongoose.model("Course", Course_Schema);
