// src/components/RoomMap.jsx
import React from "react";

/*
 Seat-style RoomMap for 3 majors (Block A/B/C).
 Props:
  - rooms: array with .id, .name, .major, .isBooked
  - onSelect(room)
  - selectedRoomId
*/

function SeatTile({ r, onSelect, isSelected }) {
  const booked = !!r.isBooked;
  return (
    <div
      onClick={() => { if(!booked) onSelect(r); }}
      title={`${r.name} • ₹${r.pricePerNight}/night`}
      style={{
        height: 56,
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: booked ? "#ef4444" : "#bbf7d0",
        color: booked ? "#fff" : "#044e3a",
        fontWeight: 700,
        cursor: booked ? "not-allowed" : "pointer",
        border: isSelected ? "3px solid #064e3b" : "1px solid #e6eef6",
        boxShadow: isSelected ? "0 10px 24px rgba(6,78,59,0.12)" : "0 6px 14px rgba(2,6,23,0.06)"
      }}
    >
      {r.id}
    </div>
  );
}

function MajorBlock({ title, blockRooms, onSelect, selectedRoomId }) {
  return (
    <div style={{marginBottom:18}}>
      <h4 style={{margin:"6px 0"}}>{title}</h4>
      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(5, minmax(0,1fr))", // 5 columns gives compact look for 10 tiles (2 rows)
        gap:10
      }}>
        {blockRooms.map(r => (
          <SeatTile key={r.id} r={r} onSelect={onSelect} isSelected={selectedRoomId === r.id} />
        ))}
      </div>
    </div>
  );
}

export default function RoomMap({ rooms = [], onSelect = () => {}, selectedRoomId = null }) {
  const majors = Array.from(new Set(rooms.map(r => r.major))).sort();

  return (
    <div style={{marginBottom:18}}>
      {majors.map(m => {
        const blockRooms = rooms.filter(r => r.major === m);
        return (
          <MajorBlock
            key={m}
            title={m}
            blockRooms={blockRooms}
            onSelect={onSelect}
            selectedRoomId={selectedRoomId}
          />
        );
      })}
      <div style={{marginTop:8, fontSize:13, color:"#374151"}}>
        <span style={{display:"inline-block", width:12, height:12, background:"#bbf7d0", marginRight:6, borderRadius:3}}/> Available
        <span style={{display:"inline-block", width:12, height:12, background:"#ef4444", marginLeft:16, marginRight:6, borderRadius:3}}/> Booked
      </div>
    </div>
  );
}
