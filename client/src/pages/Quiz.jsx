import { useState } from "react";
import Layout from "../components/Layout";
import { quizData } from "../Data/quizData";
import { saveQuiz } from "../services/progressService";

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function Quiz() {

  const [topic, setTopic] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [questions, setQuestions] = useState([]);

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [finished, setFinished] = useState(false);

  function startQuiz(selectedTopic, selectedDifficulty) {

    const q = shuffle(
      quizData[selectedTopic][selectedDifficulty]
    );

    setTopic(selectedTopic);
    setDifficulty(selectedDifficulty);
    setQuestions(q);

    setCurrent(0);
    setScore(0);
    setFinished(false);
  }

  function checkAnswer(index) {

    if (showAnswer) return; // 🔥 double click bug fix

    setSelected(index);
    setShowAnswer(true);

    if (index === questions[current].answer) {
      setScore((prev) => prev + 1); // 🔥 safe state update
    }
  }

  // 🔥 FINAL (DB SAVE)
  async function nextQuestion() {

    setSelected(null);
    setShowAnswer(false);

    if (current + 1 < questions.length) {
      setCurrent((prev) => prev + 1);
    } else {

      try {
        await saveQuiz({
          topic,
          difficulty,
          score,
          total: questions.length,
        });
      } catch (error) {
        console.error("Quiz save failed:", error);
      }

      setFinished(true);
    }
  }

  /* ---------- Topic Selection ---------- */

  if (!topic) {

    return (

      <Layout>

        <h1 className="text-4xl font-bold mb-10 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
          Choose Quiz Topic
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {Object.keys(quizData).map((t) => {

            const label = t
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, s => s.toUpperCase());

            return (

              <div
                key={t}
                onClick={() => setTopic(t)}
                className="cursor-pointer bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-blue-500 hover:scale-105 transition"
              >

                <h2 className="text-xl font-semibold mb-2">
                  {label}
                </h2>

                <p className="text-gray-400 text-sm">
                  Practice interview questions for {label}
                </p>

              </div>

            );

          })}

        </div>

      </Layout>

    );
  }

  /* ---------- Difficulty Selection ---------- */

  if (!difficulty) {

    return (

      <Layout>

        <h1 className="text-4xl font-bold mb-10">
          Select Difficulty
        </h1>

        <div className="grid md:grid-cols-3 gap-6">

          <div
            onClick={() => startQuiz(topic, "easy")}
            className="cursor-pointer bg-green-600/20 border border-green-600 rounded-xl p-6 hover:scale-105 transition"
          >
            <h2 className="text-xl font-bold">Easy</h2>
            <p className="text-sm text-gray-300">
              Basic understanding questions
            </p>
          </div>

          <div
            onClick={() => startQuiz(topic, "medium")}
            className="cursor-pointer bg-blue-600/20 border border-blue-600 rounded-xl p-6 hover:scale-105 transition"
          >
            <h2 className="text-xl font-bold">Medium</h2>
            <p className="text-sm text-gray-300">
              Concept + logic questions
            </p>
          </div>

          <div
            onClick={() => startQuiz(topic, "hard")}
            className="cursor-pointer bg-red-600/20 border border-red-600 rounded-xl p-6 hover:scale-105 transition"
          >
            <h2 className="text-xl font-bold">Hard</h2>
            <p className="text-sm text-gray-300">
              Interview-level tricky questions
            </p>
          </div>

        </div>

      </Layout>

    );
  }

  /* ---------- Quiz Finished ---------- */

  if (finished) {

    return (

      <Layout>

        <h1 className="text-4xl font-bold mb-4">
          Quiz Completed 🎉
        </h1>

        <h2 className="text-xl">
          Score: {score} / {questions.length}
        </h2>

        <p className="text-gray-400 mt-2">
          Topic: {topic} | Difficulty: {difficulty}
        </p>

      </Layout>

    );
  }

  const q = questions[current];

  return (

    <Layout>

      <h1 className="text-3xl mb-4">
        {topic} Quiz ({difficulty})
      </h1>

      <p className="text-gray-400 mb-6">
        Question {current + 1} / {questions.length}
      </p>

      <p className="mb-6 text-lg">
        {q.question}
      </p>

      {q.options.map((option, index) => {

        let color = "bg-slate-700";

        if (showAnswer) {

          if (index === q.answer) color = "bg-green-600";
          else if (index === selected) color = "bg-red-600";

        }

        return (

          <div
            key={index}
            onClick={() => checkAnswer(index)}
            className={`p-3 mb-3 rounded cursor-pointer transition ${color}`}
          >
            {option}
          </div>

        );

      })}

      {showAnswer && (

        <div className="bg-slate-800 border border-slate-700 p-4 rounded mt-4">

          <strong>Explanation</strong>

          <p className="text-gray-300 mt-2">
            {q.explanation}
          </p>

        </div>

      )}

      {showAnswer && (

        <button
          onClick={nextQuestion}
          className="mt-6 px-6 py-2 bg-purple-600 rounded hover:scale-105 transition"
        >
          Next Question
        </button>

      )}

    </Layout>

  );
}

export default Quiz;