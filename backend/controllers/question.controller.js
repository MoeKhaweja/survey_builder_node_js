const Question = require("../models/question.model");
const Survey = require("../models/survey.model");

const createQuestion = async (req, res) => {
  try {
    const { text, type, options, surveyId } = req.body;

    const newQuestion = await Question.create({
      text,
      type,
      options,
    });

    await Survey.findByIdAndUpdate(surveyId, {
      $push: { questions: newQuestion._id },
    });

    res.status(201).json({ question: newQuestion });
  } catch (error) {
    res.status(500).json({ error: "Failed to create a new question." });
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const { questionId } = req.body;
    const deletedQuestion = await Question.findById(questionId);

    if (!deletedQuestion) {
      return res
        .status(404)
        .json({ error: "Question not found or already deleted." });
    }

    await Survey.updateMany(
      { questions: questionId },
      { $pull: { questions: questionId } },
      { new: true }
    );

    await Question.findByIdAndde(questionId);

    res.status(200).json({ message: "Question deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete the question." });
  }
};

module.exports = {
  createQuestion,
  deleteQuestion,
};
