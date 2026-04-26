import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import FacultyList from './pages/FacultyList';
import FacultyProfile from './pages/FacultyProfile';
import BookAppointment from './pages/BookAppointment';
import StudentDashboard from './pages/StudentDashboard';
import FacultyDashboard from './pages/FacultyDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AppointmentHistory from './pages/AppointmentHistory';
import Notifications from './pages/Notifications';

function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/"                   element={<Home />} />
        <Route path="/login"              element={<Login />} />
        <Route path="/register"           element={<Register />} />
        <Route path="/faculty"            element={<FacultyList />} />
        <Route path="/faculty/:id"        element={<FacultyProfile />} />
        <Route path="/book/:facultyId"    element={<BookAppointment />} />
        <Route path="/student-dashboard"  element={<StudentDashboard />} />
        <Route path="/faculty-dashboard"  element={<FacultyDashboard />} />
        <Route path="/admin-dashboard"    element={<AdminDashboard />} />
        <Route path="/history"            element={<AppointmentHistory />} />
        <Route path="/notifications"      element={<Notifications />} />
      </Routes>
    </Router>
  );
}

export default App;
