


# 🏨 Guest Room Booking App

A simple **Guest Room Booking System** built using **React + Context API**, designed to simulate hostel/college guest room management.  
Students can sign up, log in, book rooms, view bookings, and make payments.  
Admins can manage users and monitor all bookings.

---

## 🚀 Features

### 👤 Student
- Sign up and log in securely (username + password)
- View available rooms on an interactive map
- Book a room and make a payment
- View “Booked Till” dates
- Edit personal profile (name, password)
- Log out easily from the side menu

### 🛠️ Admin
- View all registered users (usernames + passwords)
- Edit user details or reset passwords
- View all room bookings in one place



## 🏗️ Project Structure


'''
src/
│
├── components/
│   ├── RoomCard.jsx         # Room information and booking button
│   ├── BookingModal.jsx     # Booking & payment popup
│   ├── RoomMap.jsx          # Room map layout
│
├── context/
│   ├── AuthContext.jsx      # Handles login, logout, signup, profile updates
│   └── BookingContext.jsx   # Handles room booking logic
│
├── data/
│   ├── rooms.js             # Static data of all rooms
│   └── users.js             # Student login credentials
│
├── pages/
│   ├── Home.jsx             # Main room listing and booking page
│   ├── Login.jsx            # Login page
│   ├── Signup.jsx           # Sign up for new students
│   ├── MyBookings.jsx       # Displays user’s own bookings
│   ├── Profile.jsx          # Edit name, password, and logout
│   └── Admin.jsx            # Admin dashboard to view/edit users
│
├── styles.css               # Main styling
├── App.jsx                  # Routing and app structure
└── main.jsx                 # React entry point

'''



## ⚙️ Installation and Setup

1. **Clone the repository**
   bash
   git clone https://github.com/<your-username>/<repo-name>.git
   cd <repo-name>


2. **Install dependencies**

   bash
   npm install
   

3. **Run the development server**

   bash
   npm run dev
  

4. Open your browser at
   👉 [http://localhost:5173](http://localhost:5173)

---

## 💾 Data Storage

* Currently, room and user data are stored locally in `src/data/rooms.js` and `src/data/users.js`.
* When running in a real environment, these would typically connect to a **backend API or database** for persistent data.

---

## 💡 Future Improvements

* Connect to a backend (Node.js + MongoDB or Firebase)
* Add booking date ranges
* Add payment gateway integration
* Email notifications for booking confirmation

---

## 👨‍💻 Author

**Pranav Tejankar**
🎓 B.Tech CSE Student | 💡 Passionate about Web Development
GitHub: [@prnv06tej]((https://github.com/prnv06tej/))

---

⭐ *If you like this project, consider giving it a star on GitHub!*

```

