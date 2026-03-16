import { useState } from "react";

function Quiz() {

  const easyQuestions = [
    {
      question: "What is time complexity of Binary Search?",
      options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
      answer: 1
    },
    {
      question: "Which data structure uses FIFO?",
      options: ["Stack", "Queue", "Tree", "Graph"],
      answer: 1
    }
  ];

  const mediumQuestions = [
    {
      question: "Which traversal is used in DFS?",
      options: ["Stack", "Queue", "Heap", "Hash"],
      answer: 0
    },
    {
      question: "Which data structure is used in recursion?",
      options: ["Queue", "Stack", "Tree", "Graph"],
      answer: 1
    }
  ];

  const hardQuestions = [
    {
      question: "What is the time complexity of Merge Sort?",
      options: ["O(n)", "O(n log n)", "O(log n)", "O(n²)"],
      answer: 1
    },
    {
      question: "Which algorithm uses divide and conquer?",
      options: ["Bubble Sort", "Merge Sort", "Selection Sort", "Insertion Sort"],
      answer: 1
    }
  ];

  const [difficulty, setDifficulty] = useState(null);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const questions =
    difficulty === "easy"
      ? easyQuestions
      : difficulty === "medium"
      ? mediumQuestions
      : difficulty === "hard"
      ? hardQuestions
      : [];

  function nextQuestion() {

    let newScore = score;

    if (selected === questions[current].answer) {
      newScore = score + 1;
      setScore(newScore);
    }

    setSelected(null);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {

      const history = JSON.parse(localStorage.getItem("quizHistory")) || [];

      const attempt = {
        difficulty,
        score: newScore,
        total: questions.length,
        date: new Date().toLocaleString()
      };

      history.push(attempt);

      localStorage.setItem("quizHistory", JSON.stringify(history));

      setFinished(true);
    }
  }

  if (!difficulty) {
    return (
      <div style={{ padding: "40px" }}>
        <h1>Select Quiz Difficulty</h1>

        <div style={{ marginTop: "30px", display: "flex", gap: "20px" }}>
          <button onClick={() => setDifficulty("easy")}>Easy</button>
          <button onClick={() => setDifficulty("medium")}>Medium</button>
          <button onClick={() => setDifficulty("hard")}>Hard</button>
        </div>
      </div>
    );
  }

  if (finished) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h1>Quiz Completed 🎉</h1>
        <h2>Your Score: {score} / {questions.length}</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px" }}>

      <h1>DSA Quiz ({difficulty})</h1>

      <h3 style={{ marginTop: "20px" }}>
        Question {current + 1} / {questions.length}
      </h3>

      <p style={{ marginTop: "15px" }}>
        {questions[current].question}
      </p>

      <div style={{ marginTop: "20px" }}>
        {questions[current].options.map((option, index) => (
          <div
            key={index}
            onClick={() => setSelected(index)}
            style={{
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "6px",
              cursor: "pointer",
              background: selected === index ? "#3b82f6" : "#e2e8f0"
            }}
          >
            {option}
          </div>
        ))}
      </div>

      <button
        onClick={nextQuestion}
        disabled={selected === null}
        style={{ marginTop: "20px", padding: "10px 20px" }}
      >
        Next
      </button>

    </div>
  );
}

export default Quiz;