const Survey = require("../models/survey.model");

const createSurvey = async (req, res) => {
  try {
    const { title, description } = req.body;
    const createdBy = req.user._id;

    const newSurvey = await Survey.create({
      title,
      description,
      createdBy,
    });

    res.status(201).json({ survey: newSurvey });
  } catch (error) {
    res.status(500).json({ error: "Failed to create a new survey." });
  }
};

// Controller to get all surveys
const getAllSurveys = async (req, res) => {
  try {
    const surveys = await Survey.find();
    res.status(200).json({ surveys });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch surveys." });
  }
};

// Other CRUD operations (update, delete) can be added similarly
const getSurveyWithQuestions = async (req, res) => {
  try {
    const surveyId = req.params.surveyId; // Assuming survey ID is provided in the request parameters

    const survey = await Survey.findById(surveyId).populate("questions");

    res.status(200).json({ survey });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the survey." });
  }
};

module.exports = {
  createSurvey,
  getAllSurveys,
  getSurveyWithQuestions,
  // Other CRUD functions related to surveys
};
