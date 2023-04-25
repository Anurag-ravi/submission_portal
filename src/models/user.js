const mongoose = require("mongoose");

const User_Schema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    roll: { type: Number, required: true, unique: true },
    is_faculty: { type: Boolean, required: true, default: false },
    courses_enrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    courses_tutoring: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  },
  { versionKey: false }
);

module.exports = mongoose.model("User", User_Schema);
