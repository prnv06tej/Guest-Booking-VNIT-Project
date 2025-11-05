// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { initialUsers } from "../data/users";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // users: managed list persisted to localStorage (demo). key: gb_users
  const [users, setUsers] = useState(() => {
    try {
      const raw = localStorage.getItem("gb_users");
      if (raw) return JSON.parse(raw);
      return initialUsers.slice();
    } catch {
      return initialUsers.slice();
    }
  });

  // current logged-in user (id, username, role)
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("gb_user")) || null; } catch { return null; }
  });

  // persist users and logged-in user
  useEffect(() => {
    try { localStorage.setItem("gb_users", JSON.stringify(users)); } catch {}
  }, [users]);

  useEffect(() => {
    try { localStorage.setItem("gb_user", JSON.stringify(user)); } catch {}
  }, [user]);

  // login checks the users state (not the initial file)
  const login = ({ username, password }) => {
    const found = users.find(u => u.username === username && u.password === password);
    if (found) {
      const logged = { id: found.id, username: found.username, role: found.role };
      setUser(logged);
      return { ok: true, user: logged };
    } else {
      return { ok: false, message: "Invalid username or password" };
    }
  };

  const logout = () => setUser(null);

  // update an existing user (admin action or profile)
  // patch = { username?, password?, role? }
  const updateUser = (id, patch) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, ...patch } : u));
    // if the currently logged-in user was updated, reflect change in user state
    setUser(prev => prev && prev.id === id ? { ...prev, username: (patch.username ?? prev.username), role: (patch.role ?? prev.role) } : prev);
  };

  // add a new user (admin)
  const addUser = ({ id, username, password, role = "student" }) => {
    setUsers(prev => [{ id, username, password, role }, ...prev]);
  };

  // delete a user (admin)
  const deleteUser = (id) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    // if deleting current logged user, log them out
    setUser(prev => (prev && prev.id === id) ? null : prev);
  };

  // convenience: update logged-in user's own profile
  const updateProfile = ({ id, username, password }) => {
    updateUser(id, { username, ...(password ? { password } : {}) });
  };

  return (
    <AuthContext.Provider value={{
      user,
      users,         // full users list (admin)
      login,
      logout,
      updateUser,
      addUser,
      deleteUser,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
}
