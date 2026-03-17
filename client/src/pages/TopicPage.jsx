import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import { questions } from "../Data/questionsData";

function TopicPage() {
  const { topic } = useParams();

  const topicData = questions[topic];

  const [completed, setCompleted] = useState({});

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("completedQuestions")) || {};
    setCompleted(saved);
  }, []);

  function toggleQuestion(id) {
    const updated = { ...completed };

    if (!updated[topic]) {
      updated[topic] = [];
    }

    if (updated[topic].includes(id)) {
      updated[topic] = updated[topic].filter((q) => q !== id);
    } else {
      updated[topic].push(id);
    }

    setCompleted(updated);
    localStorage.setItem("completedQuestions", JSON.stringify(updated));
  }

  if (!topicData) {
    return (
      <Layout>
        <h1 className="text-xl">Topic not found</h1>
      </Layout>
    );
  }

  function getProgress(list) {
    const solved = completed[topic] || [];
    const count = list.filter((q) => solved.includes(q.id)).length;

    return {
      count,
      total: list.length,
      percent:
        list.length === 0
          ? 0
          : Math.round((count / list.length) * 100),
    };
  }

  function Section({ title, data, color }) {
    const progress = getProgress(data);

    return (
      <div className="bg-slate-800 p-6 rounded-xl mb-6">

        {/* HEADER */}
        <div className="flex justify-between mb-3">
          <h2 className="text-lg font-semibold">
            {title}
          </h2>
          <span className="text-gray-400 text-sm">
            {progress.percent}%
          </span>
        </div>

        {/* PROGRESS BAR */}
        <div className="w-full bg-slate-700 h-2 rounded-full mb-4 overflow-hidden">
          <div
            className={`h-2 ${color}`}
            style={{ width: `${progress.percent}%` }}
          ></div>
        </div>

        {/* QUESTIONS */}
        <div className="space-y-3">
          {data.map((q) => (
            <div
              key={q.id}
              className="flex items-center justify-between bg-slate-700 px-4 py-2 rounded-lg hover:bg-slate-600 transition"
            >
              <div className="flex items-center gap-3">

                <input
                  type="checkbox"
                  checked={
                    completed[topic]?.includes(q.id) || false
                  }
                  onChange={() => toggleQuestion(q.id)}
                />

                <span>{q.title}</span>

              </div>

              <a
                href={q.link}
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 text-sm"
              >
                Solve
              </a>
            </div>
          ))}
        </div>

      </div>
    );
  }

  return (
    <Layout>

      {/* TITLE */}
      <h1 className="text-4xl font-bold leading-[1.3] pb-2 mb-10 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
        {topicData.title || topic}
      </h1>

      {/* SECTIONS */}
      <Section
        title="Easy"
        data={topicData.easy}
        color="bg-green-500"
      />

      <Section
        title="Medium"
        data={topicData.medium}
        color="bg-yellow-500"
      />

      <Section
        title="Hard"
        data={topicData.hard}
        color="bg-red-500"
      />

    </Layout>
  );
}

export default TopicPage;