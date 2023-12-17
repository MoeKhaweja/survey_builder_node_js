const mongoose = require("mongoose");

const surveySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  completedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Survey = mongoose.model("Survey", surveySchema);

module.exports = Survey;
