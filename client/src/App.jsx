import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Roadmap from "./pages/Roadmap";
import Visualizer from "./pages/Visualizer";
import Quiz from "./pages/Quiz";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/visualizer" element={<Visualizer />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </div>
  );
}

export default App;