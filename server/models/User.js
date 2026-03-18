const mongoose = require("mongoose");

// 🔥 PROGRESS SCHEMA
const progressSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },
  completedQuestions: [
    {
      type: Number,
    },
  ],
});

// 🔥 QUIZ HISTORY SCHEMA (NEW)
const quizSchema = new mongoose.Schema({
  topic: String,
  difficulty: String,
  score: Number,
  total: Number,
  date: {
    type: Date,
    default: Date.now,
  },
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  progress: [progressSchema],

  // 🔥 NEW FIELD
  quizHistory: [quizSchema],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);