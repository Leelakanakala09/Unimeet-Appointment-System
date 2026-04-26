const express = require('express');
const router  = express.Router();
const { getAllUsers, getAllAppointments, deleteUser, getStats } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.get('/users',        protect, authorizeRoles('admin'), getAllUsers);
router.get('/appointments', protect, authorizeRoles('admin'), getAllAppointments);
router.get('/stats',        protect, authorizeRoles('admin'), getStats);
router.delete('/users/:id', protect, authorizeRoles('admin'), deleteUser);

module.exports = router;
