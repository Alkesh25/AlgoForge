const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// TOKEN
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// SIGNUP
const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      token: generateToken(user._id),
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.status(200).json({
      token: generateToken(user._id),
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE PROGRESS
const updateProgress = async (req, res) => {
  try {
    const { topic, questionId } = req.body;

    const user = await User.findById(req.user._id);

    let topicProgress = user.progress.find(
      (p) => p.topic === topic
    );

    if (!topicProgress) {
      user.progress.push({
        topic,
        completedQuestions: [questionId],
      });
    } else {
      if (topicProgress.completedQuestions.includes(questionId)) {
        topicProgress.completedQuestions =
          topicProgress.completedQuestions.filter(
            (id) => id !== questionId
          );
      } else {
        topicProgress.completedQuestions.push(questionId);
      }
    }

    await user.save();

    res.json(user.progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET PROGRESS
const getProgress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user.progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// SAVE QUIZ
const saveQuizResult = async (req, res) => {
  try {
    const { topic, difficulty, score, total } = req.body;

    const user = await User.findById(req.user._id);

    user.quizHistory.push({
      topic,
      difficulty,
      score,
      total,
    });

    await user.save();

    res.json({ message: "Quiz saved" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔥 GET QUIZ HISTORY (IMPORTANT)
const getQuizHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user.quizHistory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  signupUser,
  loginUser,
  updateProgress,
  getProgress,
  saveQuizResult,
  getQuizHistory, // ✅ MUST
};