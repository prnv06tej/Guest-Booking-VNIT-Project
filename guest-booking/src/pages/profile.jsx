// src/pages/Profile.jsx
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, logout, updateProfile } = useContext(AuthContext);
  const nav = useNavigate();
  const [name, setName] = useState(user?.username || "");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  if (!user) {
    return (
      <div className="padded">
        <h3 style={{ marginTop: 0 }}>Not signed in</h3>
        <p className="small">Please login to view your profile.</p>
        <button className="btn btn-primary" onClick={() => nav("/login")}>Go to Login</button>
      </div>
    );
  }

  const save = () => {
    if (!name.trim()) return setMsg("Name cannot be empty");
    updateProfile({ id: user.id, username: name.trim(), password: password.trim() || undefined });
    setPassword("");
    setMsg("Profile updated");
  };

  return (
    <div>
      <div className="padded" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ margin: 0 }}>{user.username}</h2>
          <div className="small">Role: {user.role}</div>
          <div className="small">ID: {user.id}</div>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-ghost" onClick={() => { logout(); nav("/"); }}>Logout</button>
        </div>
      </div>

      <div className="padded" style={{ marginTop: 14, maxWidth: 520 }}>
        <h3 style={{ marginTop: 0 }}>Edit Profile</h3>
        {msg && <div style={{ marginBottom: 8, color: "#065f46" }}>{msg}</div>}
        <div style={{ marginBottom: 8 }}>
          <label className="form-label">Name</label>
          <input className="input" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label className="form-label">New Password (leave blank to keep)</label>
          <input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-primary" onClick={save}>Save</button>
          <button className="btn btn-ghost" onClick={() => { nav("/"); }}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
