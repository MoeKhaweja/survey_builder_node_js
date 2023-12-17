const express = require("express");
const router = express.Router();
const QuestionController = require("../controllers/question.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

router.delete("/delete", QuestionController.deleteQuestion);
router.post("/questions", authMiddleware, QuestionController.createQuestion);

module.exports = router;
