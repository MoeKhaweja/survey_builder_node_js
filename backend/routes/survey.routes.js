const express = require("express");
const router = express.Router();
const SurveyController = require("../controllers/survey.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

// Routes for surveys
router.get("/surveys", SurveyController.getAllSurveys);
router.post("/surveys", authMiddleware, SurveyController.createSurvey);
router.post(
  "/answerSurvey",
  authMiddleware,
  SurveyController.getSurveyWithQuestions
);

module.exports = router;
