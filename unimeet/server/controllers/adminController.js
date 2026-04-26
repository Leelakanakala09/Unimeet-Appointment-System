const User        = require('../models/User');
const Faculty     = require('../models/Faculty');
const Appointment = require('../models/Appointment');

// @desc   Get all users
// @route  GET /api/admin/users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get all appointments
// @route  GET /api/admin/appointments
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('studentId', 'name email')
      .populate('facultyId')
      .populate('slotId')
      .sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Delete a user
// @route  DELETE /api/admin/users/:id
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    // Also remove faculty profile if exists
    await Faculty.findOneAndDelete({ userId: req.params.id });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get dashboard stats
// @route  GET /api/admin/stats
const getStats = async (req, res) => {
  try {
    const totalUsers        = await User.countDocuments();
    const totalStudents     = await User.countDocuments({ role: 'student' });
    const totalFaculty      = await User.countDocuments({ role: 'faculty' });
    const totalAppointments = await Appointment.countDocuments();
    const pendingAppts      = await Appointment.countDocuments({ status: 'Pending' });
    const approvedAppts     = await Appointment.countDocuments({ status: 'Approved' });
    const rejectedAppts     = await Appointment.countDocuments({ status: 'Rejected' });
    const cancelledAppts    = await Appointment.countDocuments({ status: 'Cancelled' });

    res.json({
      totalUsers, totalStudents, totalFaculty,
      totalAppointments, pendingAppts, approvedAppts, rejectedAppts, cancelledAppts
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllUsers, getAllAppointments, deleteUser, getStats };
