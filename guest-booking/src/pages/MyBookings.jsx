import React, { useContext } from "react";
import { BookingContext } from "../context/BookingContext";
import { AuthContext } from "../context/AuthContext";

export default function MyBookings() {
  const { bookings, cancelBooking } = useContext(BookingContext);
  const { user } = useContext(AuthContext);

  if (!user) return <div className="padded">Please login to view your bookings.</div>;

  const mine = bookings.filter(b => b.userId === user.id);

  return (
    <div>
      <h2 style={{marginTop:0}}>My Bookings</h2>
      {mine.length === 0 ? <div className="padded small">No bookings yet.</div> : (
        <div className="padded">
          <table className="table">
            <thead><tr><th>ID</th><th>Room</th><th>From</th><th>To</th><th>Nights</th><th>Total</th><th>Paid</th><th></th></tr></thead>
            <tbody>
              {mine.map(b => (
                <tr key={b.bookingId}>
                  <td>{b.bookingId}</td>
                  <td>{b.roomId}</td>
                  <td>{b.from}</td>
                  <td>{b.to}</td>
                  <td>{b.nights}</td>
                  <td>₹{b.total}</td>
                  <td>{b.isPaid ? 'Yes' : 'No'}</td>
                  <td><button className="btn btn-ghost" onClick={() => cancelBooking(b.bookingId)}>Cancel</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
