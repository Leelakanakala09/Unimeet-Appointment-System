# 🎓 Unimeet — Faculty Appointment Management System

A full-stack MERN web application that allows students to book appointments with faculty members easily, without emails or waiting outside rooms.

---

## 🛠️ Tech Stack

| Layer        | Technology                        |
|-------------|-----------------------------------|
| Frontend     | React.js, React Router, Axios     |
| Backend      | Node.js, Express.js               |
| Database     | MongoDB + Mongoose                |
| Auth         | JWT + bcryptjs                    |
| Notifications| React Toastify + DB Notifications |

---

## 📁 Project Structure

```
unimeet/
├── client/          → React frontend
│   └── src/
│       ├── components/   → Navbar, FacultyCard, AppointmentCard, NotificationCard
│       ├── pages/        → Home, Login, Register, Dashboards, BookAppointment...
│       └── services/     → api.js (all Axios API calls)
└── server/          → Node.js backend
    ├── config/      → db.js, jwtConfig.js
    ├── controllers/ → authController, facultyController, appointmentController...
    ├── models/      → User, Faculty, TimeSlot, Appointment, Notification
    ├── routes/      → authRoutes, facultyRoutes, appointmentRoutes...
    └── middleware/  → authMiddleware, roleMiddleware, errorMiddleware
```

---

## 🚀 How to Run the Project

### Step 1 — Install Prerequisites
- Node.js: https://nodejs.org  
- MongoDB: https://www.mongodb.com/try/download/community  
- Git: https://git-scm.com

### Step 2 — Setup Backend
```bash
cd server
npm install
```
Create a `.env` file in `server/`:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/unimeet
JWT_SECRET=unimeet_super_secret_key_2026
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```
Then run:
```bash
npm run dev
```
Backend runs at → http://localhost:5000

### Step 3 — Setup Frontend
```bash
cd client
npm install
npm start
```
Frontend runs at → http://localhost:3000

---

## 👤 User Roles

| Role    | Capabilities |
|---------|-------------|
| Student | Register, search faculty, book/cancel appointments, view history & notifications |
| Faculty | Create slots, approve/reject requests, view appointment requests |
| Admin   | View all users & appointments, delete users, view system stats |

---

## 🔑 API Endpoints

### Auth
| Method | Endpoint            | Description       |
|--------|---------------------|-------------------|
| POST   | /api/auth/register  | Register new user |
| POST   | /api/auth/login     | Login user        |
| GET    | /api/auth/profile   | Get user profile  |

### Faculty
| Method | Endpoint                      | Description          |
|--------|-------------------------------|----------------------|
| GET    | /api/faculty                  | Get all faculty      |
| GET    | /api/faculty/:id              | Get faculty by ID    |
| POST   | /api/faculty/slots            | Add time slot        |
| GET    | /api/faculty/slots/:facultyId | Get available slots  |

### Appointments
| Method | Endpoint                       | Description           |
|--------|--------------------------------|-----------------------|
| POST   | /api/appointments              | Book appointment      |
| GET    | /api/appointments/my           | Student's appointments|
| GET    | /api/appointments/faculty      | Faculty requests      |
| PUT    | /api/appointments/:id/status   | Approve/Reject        |
| PUT    | /api/appointments/:id/cancel   | Cancel appointment    |

### Notifications
| Method | Endpoint                       | Description           |
|--------|--------------------------------|-----------------------|
| GET    | /api/notifications             | Get notifications     |
| PUT    | /api/notifications/:id/read    | Mark as read          |
| PUT    | /api/notifications/read-all    | Mark all as read      |

### Admin
| Method | Endpoint                    | Description          |
|--------|-----------------------------|----------------------|
| GET    | /api/admin/users            | Get all users        |
| GET    | /api/admin/appointments     | Get all appointments |
| GET    | /api/admin/stats            | Get system stats     |
| DELETE | /api/admin/users/:id        | Delete a user        |

---

## 🎥 Project Videos

- **Code Explanation Video:** [Add your GitHub/YouTube link here]
- **Project Overview Video:** [Add your GitHub/YouTube link here]

---

## 📌 GitHub Repository

[Add your repository link here]

---

## 👨‍💻 Developed By

- **Project:** Unimeet — Faculty Appointment Management System
- **Stack:** MERN (MongoDB, Express.js, React.js, Node.js)
- **Guided by:** Smartbridge Team
