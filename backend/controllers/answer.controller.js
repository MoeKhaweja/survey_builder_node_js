const Answer = require("../models/answer.model");

const submitAnswer = async (req, res) => {
  try {
    const { userId, surveyId, questionId, answer } = req.body;

    const newAnswer = await Answer.create({
      user: userId,
      survey: surveyId,
      question: questionId,
      answer: answer,
    });

    res.status(201).json({ answer: newAnswer });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit the answer." });
  }
};

const getAnswers = async (req, res) => {
  try {
    const { surveyId, questionId } = req.params;

    let answers;
    if (surveyId) {
      answers = await Answer.find({ survey: surveyId });
    } else if (questionId) {
      answers = await Answer.find({ question: questionId });
    } else {
      res.status(400).json({ error: "Invalid request." });
    }

    res.status(200).json({ answers });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch answers." });
  }
};

module.exports = {
  submitAnswer,
  getAnswers,
};
