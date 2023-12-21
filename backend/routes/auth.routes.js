const express = require("express");
const { login, register, verify } = require("../controllers/auth.controllers");
const { authMiddleware } = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/verify", authMiddleware, verify);

module.exports = router;
