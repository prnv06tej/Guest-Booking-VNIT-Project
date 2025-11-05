// src/pages/Login.jsx
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErr("");
    const res = login({ username: username.trim(), password: password.trim() });
    if (res.ok) {
      nav("/");
    } else {
      setErr(res.message || "Login failed");
    }
  };

  return (
    <div style={{
      minHeight: "80vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <form onSubmit={handleSubmit} className="padded" style={{ width: "100%", maxWidth: 360 }}>
        <h2 style={{ textAlign: "center", marginTop: 0 }}>Login</h2>
        {err && <div style={{ color: "#b91c1c", marginBottom: 8 }}>{err}</div>}
        <div style={{ marginBottom: 10 }}>
          <label className="form-label">Username</label>
          <input className="input" value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label className="form-label">Password</label>
          <input className="input" value={password} onChange={e => setPassword(e.target.value)} type="password" />
        </div>
        <button className="btn btn-primary" style={{ width: "100%" }} type="submit">Login</button>
      </form>
    </div>
  );
}
