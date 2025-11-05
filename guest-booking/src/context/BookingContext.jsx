import React, { createContext, useState, useContext } from "react";

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);

  const addBooking = (booking) => {
    setBookings((prev) => [...prev, booking]);
  };

  const cancelBooking = (id) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking, cancelBooking }}>
      {children}
    </BookingContext.Provider>
  );
};


export function useBooking() {
  return useContext(BookingContext);
}
