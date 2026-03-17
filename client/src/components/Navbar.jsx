import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar({ setIsAuth }) {

  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const navItem = (path, label) => {

    const active = location.pathname === path;

    return (
      <Link
        to={path}
        className={`relative px-3 py-2 text-sm font-medium transition duration-200 ${
          active
            ? "text-white"
            : "text-gray-400 hover:text-white"
        }`}
      >
        {label}

        {active && (
          <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-gradient-to-r from-blue-500 to-purple-500 rounded"></span>
        )}

      </Link>
    );
  };

  // ✅ FINAL LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem("token"); // 🔐 remove JWT token
    setIsAuth(false);                 // update auth state
    navigate("/login");               // redirect to login
  };

  return (
    <nav className="w-full sticky top-0 z-50 backdrop-blur bg-slate-900/70 border-b border-slate-800">

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">

        <Link
          to="/"
          className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"
        >
          AlgoForge
        </Link>

        <div className="flex items-center gap-6">

          {navItem("/", "Home")}
          {navItem("/roadmap", "Roadmap")}
          {navItem("/visualizer", "Visualizer")}
          {navItem("/quiz", "Quiz")}

          <div className="relative">

            <button
              onClick={() => setOpen(!open)}
              className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold hover:scale-105 transition"
            >
              U
            </button>

            {open && (
              <div className="absolute right-0 mt-3 w-40 bg-slate-800 border border-slate-700 rounded-lg shadow-lg overflow-hidden">

                <Link
                  to="/progress"
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-slate-700"
                >
                  Progress
                </Link>

                <Link
                  to="/settings"
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-slate-700"
                >
                  Settings
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-slate-700"
                >
                  Logout
                </button>

              </div>
            )}

          </div>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;