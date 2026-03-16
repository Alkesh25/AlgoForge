import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Roadmap from "./pages/Roadmap";
import Visualizer from "./pages/Visualizer";
import Quiz from "./pages/Quiz";
import Login from "./pages/Login";
import Progress from "./pages/Progress";
import Settings from "./pages/Settings";
import Arrays from "./pages/Arrays";

import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser);
  }, []);

  return (
    <div>

      {user && <Navbar />}

      <Routes>

        {!user && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}

        {user && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/visualizer" element={<Visualizer />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/roadmap/arrays" element={<Arrays />} />
            <Route path="/login" element={<Navigate to="/" />} />
          </>
        )}

      </Routes>

    </div>
  );
}

export default App;