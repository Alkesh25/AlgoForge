const express = require("express");
const {
  signupUser,
  loginUser,
  updateProgress,
  getProgress,
  saveQuizResult,
  getQuizHistory, // ✅ ADD
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// PUBLIC
router.post("/signup", signupUser);
router.post("/login", loginUser);

// PROTECTED
router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

router.post("/progress", protect, updateProgress);
router.get("/progress", protect, getProgress);

// QUIZ ROUTES (FINAL)
router.post("/quiz", protect, saveQuizResult);
router.get("/quiz", protect, getQuizHistory); // ✅ IMPORTANT

module.exports = router;