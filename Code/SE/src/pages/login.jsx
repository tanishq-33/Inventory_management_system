import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLogin) onLogin();
  };

  return (
    <div style={{
      maxWidth: 350,
      margin: "60px auto",
      padding: 32,
      borderRadius: 8,
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      background: "#fff",
      fontFamily: "sans-serif"
    }}>
      <h2 style={{ textAlign: "center", marginBottom: 32 }}>Welcome Back</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontWeight: 500 }}>Username *</label>
          <input
            type="text"
            placeholder="Enter your Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            style={{
              width: "100%",
              padding: 8,
              marginTop: 6,
              borderRadius: 4,
              border: "1px solid #ddd"
            }}
            required
          />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontWeight: 500 }}>Password *</label>
          <input
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: 8,
              marginTop: 6,
              borderRadius: 4,
              border: "1px solid #ddd"
            }}
            required
          />
        </div>
        <div style={{ marginBottom: 18, display: "flex", alignItems: "center" }}>
          <input
            type="checkbox"
            checked={remember}
            onChange={e => setRemember(e.target.checked)}
            id="remember"
            style={{ marginRight: 8 }}
          />
          <label htmlFor="remember" style={{ fontSize: 14 }}>Remember me</label>
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            background: "#FFD600",
            color: "#222",
            border: "none",
            padding: "10px 0",
            borderRadius: 4,
            fontWeight: 600,
            fontSize: 16,
            cursor: "pointer"
          }}
        >
          Login
        </button>
        <div style={{ marginTop: 24, textAlign: "center", color: "#888", fontSize: 14 }}>
          <div>
            Don’t have an account?
          </div>
        </div>
      </form>
    </div>
  );
}