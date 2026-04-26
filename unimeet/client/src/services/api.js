import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Attach JWT token automatically to every request
API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem('userInfo'));
  if (user && user.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

// ─── Auth ───────────────────────────────────────────────
export const registerUser  = (data) => API.post('/auth/register', data);
export const loginUser     = (data) => API.post('/auth/login', data);
export const getProfile    = ()     => API.get('/auth/profile');

// ─── Faculty ────────────────────────────────────────────
export const getAllFaculty    = ()           => API.get('/faculty');
export const getFacultyById   = (id)        => API.get(`/faculty/${id}`);
export const getFacultySlots  = (facultyId) => API.get(`/faculty/slots/${facultyId}`);
export const addSlot          = (data)      => API.post('/faculty/slots', data);
export const deleteSlot       = (slotId)    => API.delete(`/faculty/slots/${slotId}`);

// ─── Appointments ───────────────────────────────────────
export const bookAppointment       = (data)         => API.post('/appointments', data);
export const getMyAppointments     = ()             => API.get('/appointments/my');
export const getFacultyAppointments= ()             => API.get('/appointments/faculty');
export const updateStatus          = (id, status)   => API.put(`/appointments/${id}/status`, { status });
export const cancelAppointment     = (id)           => API.put(`/appointments/${id}/cancel`);

// ─── Notifications ──────────────────────────────────────
export const getNotifications  = ()   => API.get('/notifications');
export const markRead          = (id) => API.put(`/notifications/${id}/read`);
export const markAllRead       = ()   => API.put('/notifications/read-all');

// ─── Admin ──────────────────────────────────────────────
export const getAllUsers             = ()   => API.get('/admin/users');
export const getAllAppointmentsAdmin = ()   => API.get('/admin/appointments');
export const getAdminStats          = ()   => API.get('/admin/stats');
export const deleteUser             = (id) => API.delete(`/admin/users/${id}`);
