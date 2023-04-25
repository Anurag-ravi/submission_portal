const mongoose = require("mongoose");

const Feedback_Schema = mongoose.Schema(
  {
    submission: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Submission",
      required: true,
    },
    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comment: { type: String },
    time: { type: Date, default: Date.now },
    marks: { type: Number, required: true },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Feedback", Feedback_Schema);
