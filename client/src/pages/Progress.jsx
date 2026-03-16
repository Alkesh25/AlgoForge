import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Progress() {

  const [history, setHistory] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("quizHistory")) || [];
    setHistory(data);
  }, []);

  const easy = history.filter((h) => h.difficulty === "easy").length;
  const medium = history.filter((h) => h.difficulty === "medium").length;
  const hard = history.filter((h) => h.difficulty === "hard").length;

  const chartData = {
    labels: ["Easy", "Medium", "Hard"],
    datasets: [
      {
        label: "Quiz Attempts",
        data: [easy, medium, hard],
        backgroundColor: ["#22c55e", "#3b82f6", "#ef4444"]
      }
    ]
  };

  return (

    <Layout>

      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
        Your Progress
      </h1>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <Stat title="Total Attempts" value={history.length} />

        <Stat
          title="Best Score"
          value={
            history.length
              ? Math.max(...history.map((h) => h.score))
              : 0
          }
        />

        <Stat
          title="Average Score"
          value={
            history.length
              ? (
                  history.reduce((sum, h) => sum + h.score, 0) /
                  history.length
                ).toFixed(2)
              : 0
          }
        />

      </div>

      {/* Chart */}

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 max-w-xl">

        <h2 className="text-xl font-semibold mb-4">
          Quiz Difficulty Distribution
        </h2>

        <Bar data={chartData} />

      </div>

    </Layout>

  );
}

function Stat({ title, value }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 text-center">
      <h3 className="text-gray-400">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}

export default Progress;