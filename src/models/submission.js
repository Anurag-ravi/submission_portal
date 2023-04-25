const mongoose = require("mongoose");

const Submission_Schema = mongoose.Schema(
  {
    assignment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    file: {
      mimetype: { type: String, required: true },
      path: { type: String, required: true },
      filename: { type: String, required: true },
    },
    time: { type: Date, default: Date.now },
    comment: { type: String },
    feedback: { type: mongoose.Schema.Types.ObjectId, ref: "Feedback" },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Submission", Submission_Schema);
