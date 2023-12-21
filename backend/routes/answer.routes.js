const express = require("express");
const router = express.Router();
const AnswerController = require("../controllers/answer.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

router.post("/answers", authMiddleware, AnswerController.submitAnswer);
router.get("/answers/survey/:surveyId", AnswerController.getAnswers);
router.get("/answers/question/:questionId", AnswerController.getAnswers);

module.exports = router;
