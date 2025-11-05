// src/pages/Home.jsx
import React, { useState, useContext } from "react";
import { rooms as roomsData } from "../data/rooms";
import RoomCard from "../components/RoomCard";
import BookingModal from "../components/BookingModal";
import RoomMap from "../components/RoomMap";
import { AuthContext } from "../context/AuthContext";
import { BookingContext } from "../context/BookingContext";

export default function Home() {
  const { user } = useContext(AuthContext);
  const { bookings, addBooking, updateBooking } = useContext(BookingContext);

  const [selected, setSelected] = useState(null);
  const [flash, setFlash] = useState(null);
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  // compute rooms with isBooked flag
  const rooms = roomsData.map(r => ({
    ...r,
    isBooked: bookings.some(b => b.roomId === r.id)
  }));

  // compute bookedTill map: latest 'to' date per room (ISO strings)
  const bookedTillMap = {};
  bookings.forEach(b => {
    const cur = bookedTillMap[b.roomId];
    const dt = new Date(b.to);
    if (!cur || dt > new Date(cur)) bookedTillMap[b.roomId] = b.to;
  });

  const handleBook = (room) => {
    if (!user) {
      setFlash("Please login as a student to book.");
      return;
    }
    setSelected(room);
    setSelectedRoomId(room.id);
  };

  const closeModal = () => {
    setSelected(null);
    setSelectedRoomId(null);
  };

  const hasOverlap = (roomId, from, to) => {
    if (!from || !to) return false;
    const newFrom = new Date(from);
    const newTo = new Date(to);
    return bookings.some(b => {
      if (b.roomId !== roomId) return false;
      const existingFrom = new Date(b.from);
      const existingTo = new Date(b.to);
      // end-exclusive overlap check
      return newFrom < existingTo && newTo > existingFrom;
    });
  };

  const confirm = ({roomId, from, to, nights, total}) => {
    const room = rooms.find(r => r.id === roomId);
    if (!room) { setFlash("Room not found."); return; }

    if (hasOverlap(roomId, from, to)) {
      setFlash("Selected dates overlap with existing booking for this room.");
      setSelected(null);
      setSelectedRoomId(null);
      return;
    }

    const booking = { bookingId: "BKG" + Date.now(), roomId, userId: user.id, from, to, nights, total, isPaid: false, createdAt: new Date().toISOString() };
    addBooking(booking);

    setSelected(null);
    setSelectedRoomId(null);
    setTimeout(() => {
      updateBooking(booking.bookingId, { isPaid: true });
      setFlash(
        <div className="card" style={{background:"#ecfdf5", border:"1px solid #bbf7d0"}}>
          <h3 style={{marginTop:0}}>Payment Successful 🎉</h3>
          <div style={{fontWeight:700}}>{room.name}</div>
          <div className="small">From <strong>{from}</strong> — To <strong>{to}</strong></div>
          <div style={{marginTop:6}}>Total: <strong>₹{total}</strong></div>
          <div style={{marginTop:8}}><button className="btn btn-ghost" onClick={() => setFlash(null)}>Close</button></div>
        </div>
      );
    }, 200);
  };

  // availableRooms: only those not currently booked
  const availableRooms = rooms.filter(r => !r.isBooked);

  return (
    <div>
      {flash && (typeof flash === "string" ? <div className="flash">{flash}</div> : <div style={{marginBottom:12}}>{flash}</div>)}

      <RoomMap rooms={rooms} onSelect={handleBook} selectedRoomId={selectedRoomId} />

      <section>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <h2 style={{margin:0}}>Available Rooms</h2>
          <div className="small">{user ? `Logged in as ${user.username}` : 'Not logged in'}</div>
        </div>

        <div className="grid">
          {availableRooms.map(r => (
            <RoomCard key={r.id} room={r} onBook={handleBook} bookedTill={bookedTillMap[r.id]} />
          ))}
        </div>
      </section>

      {selected && <BookingModal room={selected} onClose={closeModal} onConfirm={confirm} />}
    </div>
  );
}
