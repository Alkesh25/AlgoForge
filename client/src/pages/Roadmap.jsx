import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";

import { questions } from "../Data/questionsData";
import { roadmapNodes, roadmapEdges } from "../Data/roadmapData";
import { useNavigate } from "react-router-dom";
import { getProgress } from "../services/progressService"; // ✅ NEW

function Roadmap() {
  const navigate = useNavigate();

  const [completed, setCompleted] = useState({});

  // 🔥 LOAD FROM DB
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const data = await getProgress();

        const formatted = {};

        data.forEach((item) => {
          formatted[item.topic.toLowerCase()] =
            item.completedQuestions;
        });

        setCompleted(formatted);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProgress();
  }, []);

  const nodes = roadmapNodes.map((node) => {

    const topicKey = node.id.toLowerCase();

    const solvedForTopic = completed[topicKey] || [];

    const topicQuestions = questions[node.id];

    let total = 0;

    if (topicQuestions) {
      total =
        topicQuestions.easy.length +
        topicQuestions.medium.length +
        topicQuestions.hard.length;
    }

    const progress =
      total === 0
        ? 0
        : Math.round((solvedForTopic.length / total) * 100);

    return {
      id: node.id,
      position: node.position,

      style: {
        background: "transparent",
        border: "none",
      },

      data: {
        label: (
          <div
            onClick={() => navigate(`/roadmap/${node.id}`)}
            className="cursor-pointer w-[230px] bg-slate-800 border border-slate-700 rounded-xl p-5 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/30 transition duration-300"
          >

            <h3 className="text-white text-sm font-semibold mb-3 text-center">
              {node.label}
            </h3>

            <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <p className="text-xs text-gray-400 text-center mt-2">
              {progress}%
            </p>

          </div>
        ),
      },
    };
  });

  const edges = roadmapEdges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    animated: true,
    style: {
      stroke: "#64748b",
      strokeWidth: 2,
    },
  }));

  return (
    <Layout>

      <h1 className="text-4xl font-bold leading-[1.3] pb-2 mb-10 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
        DSA Learning Roadmap
      </h1>

      <div className="h-[900px] bg-slate-900 border border-slate-800 rounded-xl">

        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          zoomOnScroll={false}
          zoomOnPinch={false}
          panOnScroll={true}
          zoomOnDoubleClick={false}
          minZoom={0.5}
          maxZoom={1.5}
        >

          <Background color="#334155" gap={20} />
          <Controls />

        </ReactFlow>

      </div>

    </Layout>
  );
}

export default Roadmap;