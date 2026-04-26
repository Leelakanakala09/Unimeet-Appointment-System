const express = require('express');
const router  = express.Router();
const {
  bookAppointment,
  getMyAppointments,
  getFacultyAppointments,
  updateAppointmentStatus,
  cancelAppointment
} = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.post('/',              protect, authorizeRoles('student'), bookAppointment);
router.get('/my',             protect, getMyAppointments);
router.get('/faculty',        protect, authorizeRoles('faculty'), getFacultyAppointments);
router.put('/:id/status',     protect, authorizeRoles('faculty'), updateAppointmentStatus);
router.put('/:id/cancel',     protect, cancelAppointment);

module.exports = router;
