// src/components/RoomCard.jsx
import React from "react";

export default function RoomCard({ room, onBook, bookedTill }) {
  return (
    <div className="card">
      <div className="room-image">Room {room.id}</div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div>
          <h3 style={{margin:'6px 0'}}>{room.name}</h3>
          <div className="small">Capacity: {room.capacity} · {room.features?.join(', ')}</div>
          {bookedTill && <div className="small" style={{marginTop:6}}>Booked till: <strong>{bookedTill}</strong></div>}
        </div>
        <div style={{textAlign:'right'}}>
          <div style={{fontWeight:700}}>₹{room.pricePerNight}</div>
          {!room.isBooked ? (
            <button className="btn btn-primary" style={{marginTop:10}} onClick={() => onBook(room)}>Reserve</button>
          ) : (
            <div style={{marginTop:12, color:"#ef4444", fontWeight:700}}>Booked</div>
          )}
        </div>
      </div>
    </div>
  );
}
