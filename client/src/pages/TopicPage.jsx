import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { questions } from "../Data/questionsData";
import { useState, useEffect } from "react";

function TopicPage() {

  const { topic } = useParams();

  const topicQuestions = questions[topic];

  const [completed, setCompleted] = useState([]);

  useEffect(() => {

    const saved =
      JSON.parse(localStorage.getItem("completedQuestions")) || {};

    setCompleted(saved[topic] || []);

  }, [topic]);

  function toggleQuestion(id) {

    let updated;

    if (completed.includes(id)) {
      updated = completed.filter(q => q !== id);
    } else {
      updated = [...completed, id];
    }

    setCompleted(updated);

    const saved =
      JSON.parse(localStorage.getItem("completedQuestions")) || {};

    saved[topic] = updated;

    localStorage.setItem(
      "completedQuestions",
      JSON.stringify(saved)
    );
  }

  if (!topicQuestions) {

    return (
      <Layout>
        <h1 className="text-3xl text-white">Topic not found</h1>
      </Layout>
    );

  }

  return (

    <Layout>

      <h1 className="text-4xl font-bold mb-10 capitalize bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
        {topic}
      </h1>

      {/* EASY */}

      <Section
        title="Easy"
        questions={topicQuestions.easy}
        completed={completed}
        toggle={toggleQuestion}
      />

      {/* MEDIUM */}

      <Section
        title="Medium"
        questions={topicQuestions.medium}
        completed={completed}
        toggle={toggleQuestion}
      />

      {/* HARD */}

      <Section
        title="Hard"
        questions={topicQuestions.hard}
        completed={completed}
        toggle={toggleQuestion}
      />

    </Layout>

  );

}

function Section({ title, questions, completed, toggle }) {

  if (!questions || questions.length === 0) return null;

  return (

    <div className="mb-10">

      <h2 className="text-2xl font-semibold text-white mb-4">
        {title}
      </h2>

      <div className="space-y-3">

        {questions.map((q) => (

          <div
            key={q.id}
            className="bg-slate-800 border border-slate-700 rounded-lg p-4 flex justify-between items-center"
          >

            <div className="flex items-center gap-3">

              <input
                type="checkbox"
                checked={completed.includes(q.id)}
                onChange={() => toggle(q.id)}
              />

              <span className="text-gray-200">
                {q.title}
              </span>

            </div>

            <a
              href={q.link}
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 hover:underline"
            >
              Solve →
            </a>

          </div>

        ))}

      </div>

    </div>

  );

}

export default TopicPage;