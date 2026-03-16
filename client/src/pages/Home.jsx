import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "../components/Layout";

function Home() {

  const cards = [
    {
      title: "Algorithm Visualizer",
      desc: "Watch sorting algorithms come to life.",
      link: "/visualizer",
      icon: "📊"
    },
    {
      title: "DSA Roadmap",
      desc: "Follow a structured path to master DSA.",
      link: "/roadmap",
      icon: "🧠"
    },
    {
      title: "DSA Quiz",
      desc: "Test your knowledge with interactive quizzes.",
      link: "/quiz",
      icon: "🎯"
    },
    {
      title: "Your Progress",
      desc: "Track your growth and quiz performance.",
      link: "/progress",
      icon: "📈"
    }
  ];

  return (

    <Layout>

      {/* background grid */}

      <div className="absolute inset-0 -z-10 opacity-20 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* hero glow */}

      <div className="relative">

        <div className="absolute inset-0 flex justify-center -top-20 pointer-events-none">

          <div className="w-[600px] h-[400px] bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 blur-3xl rounded-full"></div>

        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 relative"
        >

          <h1 className="text-5xl md:text-6xl font-bold leading-[1.25] pb-3 mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
            Forge Your Algorithm Skills ⚡
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg">
            Master Data Structures and Algorithms through visualization,
            quizzes and a structured learning roadmap.
          </p>

          <div className="flex justify-center gap-6 flex-wrap">

            <Link
              to="/roadmap"
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 transition shadow-lg"
            >
              Start Learning
            </Link>

            <Link
              to="/visualizer"
              className="px-8 py-3 rounded-xl border border-gray-600 hover:bg-gray-800 transition"
            >
              Explore Visualizer
            </Link>

          </div>

        </motion.div>

      </div>

      {/* feature cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

        {cards.map((card, index) => (

          <motion.div
            key={index}
            whileHover={{ scale: 1.05, y: -6 }}
            transition={{ type: "spring", stiffness: 200 }}
          >

            <Link
              to={card.link}
              className="block bg-slate-800/80 backdrop-blur border border-slate-700 rounded-xl p-6 transition duration-300 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20"
            >

              <div className="text-4xl mb-4">
                {card.icon}
              </div>

              <h2 className="text-xl font-semibold mb-2">
                {card.title}
              </h2>

              <p className="text-gray-400 text-sm">
                {card.desc}
              </p>

            </Link>

          </motion.div>

        ))}

      </div>

    </Layout>
  );
}

export default Home;