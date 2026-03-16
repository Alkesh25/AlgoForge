import { useState } from "react";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    if (email && password) {
      localStorage.setItem("user", email);

      // reload app so App.jsx detects login
      window.location.href = "/";
    } else {
      alert("Please enter email and password");
    }
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0f172a"
      }}
    >
      <form
        onSubmit={handleLogin}
        autoComplete="off"
        style={{
          background: "#1e293b",
          padding: "40px",
          borderRadius: "10px",
          color: "white",
          width: "300px"
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Login</h2>

        {/* Email Input */}

        <input
          type="email"
          placeholder="Email"
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            background: "#334155",
            color: "white",
            border: "1px solid #475569",
            borderRadius: "6px"
          }}
        />

        {/* Password Input */}

        <input
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            background: "#334155",
            color: "white",
            border: "1px solid #475569",
            borderRadius: "6px"
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            background: "#3b82f6",
            border: "none",
            color: "white",
            cursor: "pointer",
            borderRadius: "6px"
          }}
        >
          Login
        </button>

      </form>
    </div>
  );
}

export default Login;