// src/components/BookingModal.jsx
import React, { useState } from "react";

export default function BookingModal({ room, onClose, onConfirm }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [err, setErr] = useState("");

  const nights = (from && to) ? Math.max(0, Math.ceil((new Date(to) - new Date(from)) / (1000*60*60*24))) : 0;
  const total = nights * (room.pricePerNight || 0);

  const handlePay = () => {
    if (nights === 0) { setErr("Please choose valid From and To dates."); return; }
    setErr("");
    // call onConfirm with booking details; parent handles simulating payment and marking paid
    onConfirm({ roomId: room.id, from, to, nights, total });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3 style={{marginTop:0}}>Reserve — {room.name}</h3>
        {err && <div style={{color:'#b91c1c', marginBottom:8}}>{err}</div>}

        <div className="form-row">
          <div style={{flex:1}}>
            <label className="form-label">From</label>
            <input className="input" type="date" value={from} onChange={e => setFrom(e.target.value)} />
          </div>
          <div style={{flex:1}}>
            <label className="form-label">To</label>
            <input className="input" type="date" value={to} onChange={e => setTo(e.target.value)} />
          </div>
        </div>

        <div style={{display:'flex', justifyContent:'space-between', marginTop:12}}>
          <div>
            <div className="small">Nights</div>
            <div style={{fontWeight:700}}>{nights}</div>
          </div>
          <div>
            <div className="small">Total</div>
            <div style={{fontWeight:700}}>₹{total}</div>
          </div>
        </div>

        <div style={{display:'flex', justifyContent:'flex-end', gap:10, marginTop:16}}>
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handlePay} disabled={nights===0}>Make Payment</button>
        </div>
      </div>
    </div>
  );
}
