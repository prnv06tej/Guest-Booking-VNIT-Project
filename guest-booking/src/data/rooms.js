// src/data/rooms.js
export const rooms = [
  // Block A (10 rooms)
  ...Array.from({length:10}).map((_,i)=>({
    id: `A${String(i+1).padStart(2,'0')}`,
    name: `Block A - Room ${String(i+1).padStart(2,'0')}`,
    major: "Block A",
    capacity: 2,
    pricePerNight: 500,
    features: ["AC"],
    floor: 1
  })),
  // Block B (10 rooms)
  ...Array.from({length:10}).map((_,i)=>({
    id: `B${String(i+1).padStart(2,'0')}`,
    name: `Block B - Room ${String(i+1).padStart(2,'0')}`,
    major: "Block B",
    capacity: 2,
    pricePerNight: 700,
    features: ["AC","Attached Washroom"],
    floor: 1
  })),
  // Block C (10 rooms)
  ...Array.from({length:10}).map((_,i)=>({
    id: `C${String(i+1).padStart(2,'0')}`,
    name: `Block C - Room ${String(i+1).padStart(2,'0')}`,
    major: "Block C",
    capacity: 3,
    pricePerNight: 900,
    features: ["AC","TV"],
    floor: 2
  }))
];
