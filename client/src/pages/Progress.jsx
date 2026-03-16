import { useEffect, useState } from "react";

function Progress() {

  const [history, setHistory] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("quizHistory")) || [];
    setHistory(data);
  }, []);

  const totalAttempts = history.length;

  const bestScore =
    history.length > 0
      ? Math.max(...history.map((h) => h.score))
      : 0;

  const totalScore = history.reduce((sum, h) => sum + h.score, 0);
  const totalQuestions = history.reduce((sum, h) => sum + h.total, 0);

  const averageScore =
    totalAttempts > 0
      ? (totalScore / totalAttempts).toFixed(2)
      : 0;

  const accuracy =
    totalQuestions > 0
      ? ((totalScore / totalQuestions) * 100).toFixed(1)
      : 0;

  const easyCount = history.filter((h) => h.difficulty === "easy").length;
  const mediumCount = history.filter((h) => h.difficulty === "medium").length;
  const hardCount = history.filter((h) => h.difficulty === "hard").length;

  return (
    <div style={{ padding: "40px" }}>

      <h1>Your Progress</h1>

      {/* Stats */}

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "30px",
          flexWrap: "wrap"
        }}
      >

        <Stat title="Total Attempts" value={totalAttempts} />
        <Stat title="Best Score" value={bestScore} />
        <Stat title="Average Score" value={averageScore} />
        <Stat title="Accuracy %" value={accuracy + "%"} />

      </div>

      {/* Difficulty Breakdown */}

      <h2 style={{ marginTop: "40px" }}>Difficulty Breakdown</h2>

      <div style={{ marginTop: "10px" }}>
        <p>Easy Attempts: {easyCount}</p>
        <p>Medium Attempts: {mediumCount}</p>
        <p>Hard Attempts: {hardCount}</p>
      </div>

      {/* History */}

      <h2 style={{ marginTop: "40px" }}>Quiz History</h2>

      {history.map((attempt, index) => (
        <div
          key={index}
          style={{
            background: "#1e293b",
            color: "white",
            padding: "15px",
            borderRadius: "8px",
            marginTop: "10px"
          }}
        >
          Difficulty: {attempt.difficulty}
          <br />
          Score: {attempt.score}/{attempt.total}
          <br />
          Date: {attempt.date}
        </div>
      ))}

    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div
      style={{
        background: "#1e293b",
        color: "white",
        padding: "20px",
        borderRadius: "10px",
        minWidth: "150px"
      }}
    >
      <h3>{title}</h3>
      <p style={{ fontSize: "22px", marginTop: "10px" }}>
        {value}
      </p>
    </div>
  );
}

export default Progress;