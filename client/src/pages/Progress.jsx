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

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function Progress() {
  const [quizHistory, setQuizHistory] = useState([]);

  useEffect(() => {
    const history =
      JSON.parse(localStorage.getItem("quizHistory")) || [];
    setQuizHistory(history);
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

  // ---------------- CHART ----------------
  const difficultyCount = { Easy: 0, Medium: 0, Hard: 0 };

  quizHistory.forEach((q) => {
    difficultyCount[q.difficulty]++;
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
  const completed =
    JSON.parse(localStorage.getItem("completedQuestions")) || {};

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

      {/* TITLE */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold leading-[1.3] pb-2 mb-10 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text"
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
          <motion.div
            key={i}
            whileHover={{ y: -5, scale: 1.03 }}
            className="bg-slate-800 p-6 rounded-xl text-center shadow-md transition"
          >
            <p className="text-gray-400">{item.label}</p>
            <h2 className="text-2xl font-bold mt-2">
              {item.value}
            </h2>
          </motion.div>
        ))}
      </div>

      {/* MAIN */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* LEFT - CHART */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-slate-800 p-6 rounded-xl shadow-md"
        >
          <h2 className="text-lg font-semibold mb-4">
            Quiz Difficulty Distribution
          </h2>

          {totalAttempts === 0 ? (
            <p className="text-gray-400 text-center mt-10">
              No quiz attempts yet
            </p>
          ) : (
            <Bar data={chartData} />
          )}
        </motion.div>

        {/* RIGHT - PROGRESS */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-slate-800 p-6 rounded-xl flex flex-col items-center shadow-md space-y-6"
        >

          {/* CIRCLE */}
          <div className="relative w-40 h-40">
            <svg className="transform -rotate-90 w-full h-full">

              {/* Background */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="#1e293b"
                strokeWidth="14"
                fill="transparent"
              />

              {/* Progress */}
              <motion.circle
                cx="80"
                cy="80"
                r={radius}
                stroke="url(#gradient)"
                strokeWidth="14"
                fill="transparent"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1 }}
                strokeLinecap="round"
              />

              <defs>
                <linearGradient id="gradient">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>

            </svg>

            {/* CENTER */}
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

          {/* DIFFICULTY */}
          <div className="w-full space-y-4">
            {[
              { label: "Easy", value: easy, color: "text-green-400" },
              { label: "Medium", value: medium, color: "text-yellow-400" },
              { label: "Hard", value: hard, color: "text-red-400" },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className="flex justify-between bg-slate-700 px-4 py-2 rounded-lg hover:bg-slate-600 transition"
              >
                <span className={`${item.color} font-semibold`}>
                  {item.label}
                </span>
                <span>{item.value}</span>
              </motion.div>
            ))}
          </div>

        </motion.div>

      </div>

    </Layout>
  );
}

export default Progress;