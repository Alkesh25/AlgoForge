import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

function Roadmap() {

  const navigate = useNavigate();

  const topics = [
    "Arrays",
    "Linked List",
    "Stack",
    "Queue",
    "Trees",
    "Graphs",
    "Dynamic Programming",
    "Greedy",
    "Backtracking",
    "Binary Search"
  ];

  return (

    <Layout>

      <h1 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
        DSA Learning Roadmap
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {topics.map((topic, index) => (

          <div
            key={index}
            onClick={() => navigate("/roadmap/arrays")}
            className="cursor-pointer bg-slate-800 border border-slate-700 rounded-xl p-8 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 transition"
          >

            <h2 className="text-xl font-semibold">
              {topic}
            </h2>

          </div>

        ))}

      </div>

    </Layout>

  );
}

export default Roadmap;