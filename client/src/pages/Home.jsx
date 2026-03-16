function Home() {
    return (
      <div style={{ padding: "40px" }}>
        <h1>Welcome to AlgoForge</h1>
        <p>Your platform to master Data Structures and Algorithms</p>
  
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "20px",
            marginTop: "40px",
          }}
        >
          <div style={cardStyle}
            onMouseEnter={(e)=>e.target.style.background="#2563eb"}
            onMouseLeave={(e)=>e.target.style.background="#1f2937"}>
            Algorithm Visualizer
          </div>
          <div style={cardStyle}
            onMouseEnter={(e)=>e.target.style.background="#2563eb"}
            onMouseLeave={(e)=>e.target.style.background="#1f2937"}>
            DSA Roadmap
          </div>
          <div style={cardStyle}
            onMouseEnter={(e)=>e.target.style.background="#2563eb"}
            onMouseLeave={(e)=>e.target.style.background="#1f2937"}>
            Practice Questions
          </div>
          <div style={cardStyle}
            onMouseEnter={(e)=>e.target.style.background="#2563eb"}
            onMouseLeave={(e)=>e.target.style.background="#1f2937"}>
            Interview Quiz
          </div>
        </div>
      </div>
    );
  }
  
  const cardStyle = {
    padding: "40px",
    borderRadius: "12px",
    backgroundColor: "#1f2937",
    color: "white",
    textAlign: "center",
    fontSize: "20px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.3s",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
  };
  
  export default Home;