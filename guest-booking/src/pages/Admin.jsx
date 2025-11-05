// src/pages/Admin.jsx
import React, { useContext, useMemo, useState } from "react";
import { BookingContext } from "../context/BookingContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const { user } = useContext(AuthContext);
  const { bookings, updateBooking } = useContext(BookingContext);
  const { users, updateUser, addUser, deleteUser } = useContext(AuthContext);
  const nav = useNavigate();

  const [tab, setTab] = useState("bookings"); // 'bookings' | 'users'
  // filters for bookings
  const [q, setQ] = useState("");
  const [paidFilter, setPaidFilter] = useState("all");
  const [roomFilter, setRoomFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  if (!user || user.role !== "admin") {
    return (
      <div className="padded">
        <h3 style={{marginTop:0}}>Admin only</h3>
        <p className="small">You must login as an admin to view this page.</p>
        <button className="btn btn-primary" onClick={()=>nav("/login")}>Go to Login</button>
      </div>
    );
  }

  const filtered = useMemo(() => {
    return bookings.filter(b => {
      if (q) {
        const s = q.toLowerCase();
        if (!(`${b.bookingId} ${b.userId} ${b.roomId}`.toLowerCase().includes(s))) return false;
      }
      if (paidFilter === "paid" && !b.isPaid) return false;
      if (paidFilter === "unpaid" && b.isPaid) return false;
      if (roomFilter && b.roomId !== roomFilter) return false;
      if (dateFrom || dateTo) {
        const rFrom = dateFrom ? new Date(dateFrom) : null;
        const rTo = dateTo ? new Date(dateTo) : null;
        const bFrom = new Date(b.from);
        const bTo = new Date(b.to);
        if (rFrom && bTo < rFrom) return false;
        if (rTo && bFrom > rTo) return false;
      }
      return true;
    }).sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [bookings, q, paidFilter, roomFilter, dateFrom, dateTo]);

  // --- Users management state (local to this page)
  const [editingUser, setEditingUser] = useState(null); // object copy being edited
  const [newUser, setNewUser] = useState({ id: "", username: "", password: "", role: "student" });

  const startEdit = (u) => setEditingUser({ ...u });
  const saveEdit = () => {
    if (!editingUser || !editingUser.id) return;
    updateUser(editingUser.id, { username: editingUser.username, password: editingUser.password, role: editingUser.role });
    setEditingUser(null);
  };
  const cancelEdit = () => setEditingUser(null);

  const handleAddUser = () => {
    if (!newUser.id || !newUser.username) return alert("id and username required");
    addUser({ ...newUser });
    setNewUser({ id: "", username: "", password: "", role: "student" });
  };

  return (
    <div>
      <h2 style={{marginTop:0}}>Admin Dashboard</h2>

      <div style={{display:'flex', gap:8, marginBottom:12}}>
        <button className={`btn ${tab==="bookings" ? "btn-primary" : "btn-ghost"}`} onClick={()=>setTab("bookings")}>Bookings</button>
        <button className={`btn ${tab==="users" ? "btn-primary" : "btn-ghost"}`} onClick={()=>setTab("users")}>Users</button>
      </div>

      {tab === "bookings" && (
        <>
          <div className="padded" style={{marginBottom:14, display:'flex', gap:12, flexWrap:'wrap', alignItems:'center'}}>
            <input className="input" placeholder="Search bookingId / userId / roomId" value={q} onChange={e=>setQ(e.target.value)} style={{minWidth:220}} />
            <select className="input" value={paidFilter} onChange={e=>setPaidFilter(e.target.value)} style={{width:140}}>
              <option value="all">All</option>
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
            </select>
            <input className="input" placeholder="Room ID (exact)" value={roomFilter} onChange={e=>setRoomFilter(e.target.value)} style={{width:140}} />
            <label style={{display:'flex', flexDirection:'column'}}>
              <span className="small">From</span>
              <input className="input" type="date" value={dateFrom} onChange={e=>setDateFrom(e.target.value)} />
            </label>
            <label style={{display:'flex', flexDirection:'column'}}>
              <span className="small">To</span>
              <input className="input" type="date" value={dateTo} onChange={e=>setDateTo(e.target.value)} />
            </label>

            <div style={{marginLeft:'auto'}} className="small">Showing <strong>{filtered.length}</strong> / {bookings.length}</div>
          </div>

          <div className="padded">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th><th>Room</th><th>User</th><th>From</th><th>To</th><th>Total</th><th>Paid</th><th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(b => (
                  <tr key={b.bookingId}>
                    <td style={{fontSize:13}}>{b.bookingId}</td>
                    <td>{b.roomId}</td>
                    <td>{b.userId}</td>
                    <td>{b.from}</td>
                    <td>{b.to}</td>
                    <td>₹{b.total}</td>
                    <td>{b.isPaid ? "Yes" : "No"}</td>
                    <td>
                      {!b.isPaid ? (
                        <button className="btn btn-primary" onClick={() => updateBooking(b.bookingId, { isPaid:true })}>Mark Paid</button>
                      ) : (
                        <span className="small">—</span>
                      )}
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan="8" className="small center">No bookings match the current filters.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {tab === "users" && (
        <>
          <div className="padded" style={{marginBottom:12}}>
            <h3 style={{marginTop:0}}>Create new user</h3>
            <div style={{display:'flex', gap:8, flexWrap:'wrap', alignItems:'center'}}>
              <input className="input" placeholder="id" value={newUser.id} onChange={e=>setNewUser({...newUser,id:e.target.value})} style={{width:120}} />
              <input className="input" placeholder="username" value={newUser.username} onChange={e=>setNewUser({...newUser,username:e.target.value})} style={{width:160}} />
              <input className="input" placeholder="password" value={newUser.password} onChange={e=>setNewUser({...newUser,password:e.target.value})} style={{width:160}} />
              <select className="input" value={newUser.role} onChange={e=>setNewUser({...newUser,role:e.target.value})} style={{width:140}}>
                <option value="student">student</option>
                <option value="admin">admin</option>
              </select>
              <button className="btn btn-primary" onClick={handleAddUser}>Add user</button>
            </div>
          </div>

          <div className="padded">
            <h3 style={{marginTop:0}}>All users</h3>
            <table className="table">
              <thead><tr><th>Id</th><th>Username</th><th>Password</th><th>Role</th><th>Actions</th></tr></thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>
                      {editingUser && editingUser.id === u.id ? (
                        <input className="input" value={editingUser.username} onChange={e=>setEditingUser({...editingUser, username:e.target.value})} />
                      ) : u.username}
                    </td>
                    <td>
                      {editingUser && editingUser.id === u.id ? (
                        <input className="input" value={editingUser.password} onChange={e=>setEditingUser({...editingUser, password:e.target.value})} />
                      ) : u.password}
                    </td>
                    <td>
                      {editingUser && editingUser.id === u.id ? (
                        <select className="input" value={editingUser.role} onChange={e=>setEditingUser({...editingUser, role:e.target.value})}>
                          <option value="student">student</option>
                          <option value="admin">admin</option>
                        </select>
                      ) : u.role}
                    </td>
                    <td>
                      {editingUser && editingUser.id === u.id ? (
                        <>
                          <button className="btn btn-primary" onClick={saveEdit}>Save</button>
                          <button className="btn btn-ghost" onClick={cancelEdit}>Cancel</button>
                        </>
                      ) : (
                        <>
                          <button className="btn btn-ghost" onClick={() => startEdit(u)}>Edit</button>
                          <button className="btn btn-ghost" onClick={() => { if (window.confirm('Delete user?')) deleteUser(u.id); }}>Delete</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
                {users.length === 0 && <tr><td colSpan="5" className="center small">No users</td></tr>}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
