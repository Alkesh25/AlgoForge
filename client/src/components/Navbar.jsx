import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 40px",
        backgroundColor: "#111",
        color: "white",
      }}
    >
      <h2>AlgoForge</h2>

      <ul
        style={{
          display: "flex",
          gap: "25px",
          listStyle: "none",
        }}
      >
        <li>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            Home
          </Link>
        </li>

        <li>
          <Link to="/roadmap" style={{ color: "white", textDecoration: "none" }}>
            Roadmap
          </Link>
        </li>

        <li>
          <Link
            to="/visualizer"
            style={{ color: "white", textDecoration: "none" }}
          >
            Visualizer
          </Link>
        </li>

        <li>
          <Link to="/quiz" style={{ color: "white", textDecoration: "none" }}>
            Quiz
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;