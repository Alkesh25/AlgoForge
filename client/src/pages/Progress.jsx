import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { motion } from "framer-motion";

import { questions } from "../Data/questionsData";
import {
  getProgress,
  getQuizHistory,
} from "../services/progressService";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function Progress() {
  const [quizHistory, setQuizHistory] = useState([]);
  const [completed, setCompleted] = useState({});

  // 🔥 LOAD DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const progressData = await getProgress();
        const quizData = await getQuizHistory();

        const formatted = {};

        progressData.forEach((item) => {
          formatted[item.topic.toLowerCase()] =
            item.completedQuestions;
        });

        setCompleted(formatted);
        setQuizHistory(quizData || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // ---------------- QUIZ STATS ----------------
  const totalAttempts = quizHistory.length;

  const bestScore =
    quizHistory.length > 0
      ? Math.max(...quizHistory.map((q) => q.score))
      : 0;

  const avgScore =
    quizHistory.length > 0
      ? (
          quizHistory.reduce((sum, q) => sum + q.score, 0) /
          quizHistory.length
        ).toFixed(2)
      : 0;

  // ---------------- CHART FIX ----------------
  const difficultyCount = { Easy: 0, Medium: 0, Hard: 0 };

  quizHistory.forEach((q) => {
    const d = q.difficulty?.toLowerCase();

    if (d === "easy") difficultyCount.Easy++;
    if (d === "medium") difficultyCount.Medium++;
    if (d === "hard") difficultyCount.Hard++;
  });

  const chartData = {
    labels: ["Easy", "Medium", "Hard"],
    datasets: [
      {
        label: "Quiz Attempts",
        data: [
          difficultyCount.Easy,
          difficultyCount.Medium,
          difficultyCount.Hard,
        ],
        backgroundColor: ["#22c55e", "#eab308", "#ef4444"],
      },
    ],
  };

  // ---------------- PRACTICE PROGRESS ----------------
  let easy = 0;
  let medium = 0;
  let hard = 0;
  let totalSolved = 0;
  let totalQuestions = 0;

  Object.keys(questions).forEach((topic) => {
    totalQuestions +=
      questions[topic].easy.length +
      questions[topic].medium.length +
      questions[topic].hard.length;
  });

  Object.keys(completed).forEach((topic) => {
    const solvedIds = completed[topic];
    const topicData = questions[topic];

    if (!topicData) return;

    topicData.easy.forEach((q) => {
      if (solvedIds.includes(q.id)) {
        easy++;
        totalSolved++;
      }
    });

    topicData.medium.forEach((q) => {
      if (solvedIds.includes(q.id)) {
        medium++;
        totalSolved++;
      }
    });

    topicData.hard.forEach((q) => {
      if (solvedIds.includes(q.id)) {
        hard++;
        totalSolved++;
      }
    });
  });

  // ---------------- CIRCLE ----------------
  const percentage =
    totalQuestions === 0
      ? 0
      : Math.round((totalSolved / totalQuestions) * 100);

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <Layout>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-10"
      >
        Your Progress
      </motion.h1>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          { label: "Total Attempts", value: totalAttempts },
          { label: "Best Score", value: bestScore },
          { label: "Average Score", value: avgScore },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-slate-800 p-6 rounded-xl text-center"
          >
            <p className="text-gray-400">{item.label}</p>
            <h2 className="text-2xl font-bold mt-2">
              {item.value}
            </h2>
          </div>
        ))}
      </div>

      {/* MAIN */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* CHART */}
        <div className="bg-slate-800 p-6 rounded-xl">
          <h2 className="mb-4">Quiz Difficulty Distribution</h2>

          {totalAttempts === 0 ? (
            <p>No attempts yet</p>
          ) : (
            <Bar data={chartData} />
          )}
        </div>

        {/* PROGRESS */}
        <div className="bg-slate-800 p-6 rounded-xl flex flex-col items-center space-y-6">

          <div className="relative w-40 h-40">
            <svg className="transform -rotate-90 w-full h-full">

              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="#1e293b"
                strokeWidth="14"
                fill="transparent"
              />

              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="#3b82f6"
                strokeWidth="14"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
              />

            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold text-green-400">
                {totalSolved}
              </h2>
              <p className="text-xs text-gray-400">Solved</p>
              <p className="text-xs text-gray-400">
                {percentage}%
              </p>
            </div>
          </div>

          <div className="w-full space-y-2">
            <p>Easy: {easy}</p>
            <p>Medium: {medium}</p>
            <p>Hard: {hard}</p>
          </div>

        </div>

      </div>

    </Layout>
  );
}

export default Progress;