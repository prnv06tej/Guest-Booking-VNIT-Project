// src/App.jsx
import React, { useContext, useState, useRef, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Admin from "./pages/Admin";
import MyBookings from "./pages/MyBookings";
import Profile from "./pages/Profile";

import { AuthProvider, AuthContext } from "./context/AuthContext";
import { BookingProvider } from "./context/BookingContext";

/**
 * HeaderRight - shows login button when not signed in,
 * or a small user menu (Profile, My Bookings, Logout) when signed.
 */
function HeaderRight() {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const ref = useRef();

  // close menu when clicking outside
  useEffect(() => {
    function onDoc(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  if (!user) {
    return <Link to="/login" className="btn btn-primary">Login</Link>;
  }

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block" }}>
      <button onClick={() => setOpen(o => !o)} className="btn btn-ghost" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: "#0f766e", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>
          {user.username[0]?.toUpperCase()}
        </div>
        <span style={{ fontWeight: 600 }}>{user.username}</span>
      </button>

      {open && (
        <div style={{
          position: "absolute",
          right: 0,
          top: "calc(100% + 8px)",
          background: "#fff",
          boxShadow: "0 8px 30px rgba(2,6,23,0.12)",
          borderRadius: 8,
          padding: 10,
          width: 200,
          zIndex: 40
        }}>
          <Link to="/profile" onClick={() => setOpen(false)} style={{ display: "block", padding: "8px 4px", color: "#0f172a", textDecoration: "none" }}>Profile</Link>
          <Link to="/bookings" onClick={() => setOpen(false)} style={{ display: "block", padding: "8px 4px", color: "#0f172a", textDecoration: "none" }}>My Bookings</Link>
          <div style={{ height: 1, background: "#f1f5f9", margin: "8px 0" }} />
          <button className="btn btn-ghost" onClick={() => { logout(); setOpen(false); }} style={{ width: "100%" }}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <BrowserRouter>
          <div className="app-shell">
            <header className="header">
              <div className="brand">
                <div className="logo">G</div>
                <div>
                  <div style={{ fontWeight: 700 }}>Guest Booking</div>
                  <div className="small">College guest rooms</div>
                </div>
              </div>

              <nav className="nav" style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <Link to="/">Home</Link>
                <Link to="/bookings">My Bookings</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/signup">Sign up</Link>
                <Link to="/admin">Admin</Link>
              </nav>

              <div style={{ marginLeft: 12 }}>
                <HeaderRight />
              </div>
            </header>

            <main style={{ marginTop: 18 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/bookings" element={<MyBookings />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </BookingProvider>
    </AuthProvider>
  );
}
