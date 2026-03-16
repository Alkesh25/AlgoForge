function Arrays() {

    return (
      <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
  
        <h1 style={{ fontSize: "36px" }}>Arrays</h1>
  
        <p style={{ marginTop: "15px", color: "#475569" }}>
          Arrays are a collection of elements stored in contiguous memory
          locations. Each element can be accessed using an index.
        </p>
  
        {/* Operations Card */}
  
        <div
          style={{
            marginTop: "30px",
            padding: "25px",
            background: "#1e293b",
            color: "white",
            borderRadius: "10px"
          }}
        >
          <h2>Operations</h2>
  
          <ul style={{ marginTop: "10px" }}>
            <li>Traversal</li>
            <li>Insertion</li>
            <li>Deletion</li>
            <li>Searching</li>
          </ul>
        </div>
  
        {/* Time Complexity Card */}
  
        <div
          style={{
            marginTop: "25px",
            padding: "25px",
            background: "#1e293b",
            color: "white",
            borderRadius: "10px"
          }}
        >
          <h2>Time Complexity</h2>
  
          <ul style={{ marginTop: "10px" }}>
            <li>Access → O(1)</li>
            <li>Search → O(n)</li>
            <li>Insertion → O(n)</li>
            <li>Deletion → O(n)</li>
          </ul>
        </div>
  
      </div>
    );
  }
  
  export default Arrays;