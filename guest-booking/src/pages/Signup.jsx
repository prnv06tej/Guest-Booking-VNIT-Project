// src/pages/Signup.jsx
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const { users, addUser, login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErr("");
    const name = username.trim();
    const pwd = password.trim();
    if (!name || !pwd) return setErr("Username and password are required");

    // simple uniqueness check (username)
    if (users.some(u => u.username.toLowerCase() === name.toLowerCase())) {
      return setErr("Username already taken. Pick another.");
    }

    // create id and add user as student
    const id = "u" + Date.now();
    addUser({ id, username: name, password: pwd, role: "student" });

    // auto-login new user
    const res = login({ username: name, password: pwd });
    if (res.ok) {
      nav("/"); // go to home
    } else {
      setErr("Signup succeeded but auto-login failed. Please login manually.");
    }
  };

  return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <form onSubmit={handleSubmit} className="padded" style={{ width: "100%", maxWidth: 420 }}>
        <h2 style={{ textAlign: "center", marginTop: 0 }}>Sign up</h2>
        {err && <div style={{ color: "#b91c1c", marginBottom: 8 }}>{err}</div>}
        <div style={{ marginBottom: 10 }}>
          <label className="form-label">Username</label>
          <input className="input" value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label className="form-label">Password</label>
          <input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-primary" style={{ flex: 1 }} type="submit">Create account</button>
          <button className="btn btn-ghost" type="button" onClick={() => nav("/login")}>Back</button>
        </div>
      </form>
    </div>
  );
}
