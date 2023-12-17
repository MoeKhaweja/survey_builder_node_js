const mongoose = require("mongoose");
const Survey = require("../models/survey.model");

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  type: { type: String, enum: ["radio", "checkbox", "input"], required: true },
  options: [{ type: String }],
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
