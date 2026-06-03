import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import { questions } from "../Data/questionsData";
import { updateProgress, getProgress } from "../services/progressService";

function TopicPage() {
  const { topic } = useParams();

  // 🔥 FIX: normalize topic
  const normalizedTopic = topic.toLowerCase();

  const topicData = questions[normalizedTopic];

  const [completed, setCompleted] = useState({});

  // 🔥 LOAD FROM DB (FIXED)
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const data = await getProgress();

        const formatted = {};

        data.forEach((item) => {
          formatted[item.topic.toLowerCase()] = item.completedQuestions;
        });

        setCompleted(formatted);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProgress();
  }, []);

  // 🔥 TOGGLE + DB UPDATE (FIXED)
  const toggleQuestion = async (id) => {
    const updated = { ...completed };

    if (!updated[normalizedTopic]) {
      updated[normalizedTopic] = [];
    }

    if (updated[normalizedTopic].includes(id)) {
      updated[normalizedTopic] = updated[normalizedTopic].filter(
        (q) => q !== id
      );
    } else {
      updated[normalizedTopic].push(id);
    }

    setCompleted(updated);

    try {
      await updateProgress(normalizedTopic, id);
    } catch (error) {
      console.error(error);
    }
  };

  if (!topicData) {
    return (
      <Layout>
        <h1 className="text-xl">Topic not found</h1>
      </Layout>
    );
  }

  function getProgressStats(list) {
    const solved = completed[normalizedTopic] || [];
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
    const progress = getProgressStats(data);

    return (
      <div className="bg-slate-800 p-6 rounded-xl mb-6">

        <div className="flex justify-between mb-3">
          <h2 className="text-lg font-semibold">{title}</h2>
          <span className="text-gray-400 text-sm">
            {progress.percent}%
          </span>
        </div>

        <div className="w-full bg-slate-700 h-2 rounded-full mb-4 overflow-hidden">
          <div
            className={`h-2 ${color}`}
            style={{ width: `${progress.percent}%` }}
          ></div>
        </div>

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
                    completed[normalizedTopic]?.includes(q.id) || false
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

      <h1 className="text-4xl font-bold leading-[1.3] pb-2 mb-10 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
        {topicData.title || topic}
      </h1>

      <Section title="Easy" data={topicData.easy} color="bg-green-500" />
      <Section title="Medium" data={topicData.medium} color="bg-yellow-500" />
      <Section title="Hard" data={topicData.hard} color="bg-red-500" />

    </Layout>
  );
}

export default TopicPage;