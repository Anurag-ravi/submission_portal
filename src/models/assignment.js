const mongoose = require("mongoose");

const Assignment_Schema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  file: {
    type: {
      mimetype: { type: String, required: true },
      path: { type: String, required: true },
      filename: { type: String, required: true },
    },
    required: false,
  },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course",required: true },
  due_date: { type: Date, required: true },
  submissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Submission" }],
  total_marks: { type: Number, required: true },
});

module.exports = mongoose.model("Assignment", Assignment_Schema);
