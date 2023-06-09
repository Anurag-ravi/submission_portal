const mongoose = require("mongoose");

const Admin_Schema = mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Admin", Admin_Schema);
