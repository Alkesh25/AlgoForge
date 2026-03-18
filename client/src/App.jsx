import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Roadmap from "./pages/Roadmap";
import Visualizer from "./pages/Visualizer";
import Quiz from "./pages/Quiz";
import Login from "./pages/Login";
import Progress from "./pages/Progress";
import Settings from "./pages/Settings";
import TopicPage from "./pages/TopicPage";
import Profile from "./pages/Profile";

import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {

  const [isAuth, setIsAuth] = useState(false);

  // ✅ CHECK TOKEN ON LOAD
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);

  return (
    <div>

      {isAuth && <Navbar setIsAuth={setIsAuth} />}

      <Routes>

        {!isAuth ? (
          <>
            <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/roadmap/:topic" element={<TopicPage />} />
            <Route path="/visualizer" element={<Visualizer />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/login" element={<Navigate to="/" />} />
          </>
        )}

      </Routes>

    </div>
  );
}

export default App;