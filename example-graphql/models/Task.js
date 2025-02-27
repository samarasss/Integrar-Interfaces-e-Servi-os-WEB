const mongoose = require("mongoose");

let taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  finished: Boolean,
});

module.exports = mongoose.model("Task", taskSchema);