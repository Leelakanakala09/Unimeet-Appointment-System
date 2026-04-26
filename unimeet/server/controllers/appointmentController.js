const Appointment  = require('../models/Appointment');
const TimeSlot     = require('../models/TimeSlot');
const Faculty      = require('../models/Faculty');
const Notification = require('../models/Notification');

// @desc   Book an appointment
// @route  POST /api/appointments
const bookAppointment = async (req, res) => {
  const { facultyId, slotId, purpose } = req.body;
  try {
    const slot = await TimeSlot.findById(slotId);
    if (!slot || slot.status === 'Booked') {
      return res.status(400).json({ message: 'Slot is not available' });
    }

    const appointment = await Appointment.create({
      studentId: req.user._id,
      facultyId,
      slotId,
      purpose
    });

    // Mark slot as booked
    slot.status = 'Booked';
    await slot.save();

    // Notify the student
    await Notification.create({
      userId:        req.user._id,
      appointmentId: appointment._id,
      message:       'Your appointment request has been submitted successfully. Awaiting faculty approval.'
    });

    // Notify the faculty user
    const faculty = await Faculty.findById(facultyId);
    if (faculty) {
      await Notification.create({
        userId:        faculty.userId,
        appointmentId: appointment._id,
        message:       `New appointment request from ${req.user.name} for ${slot.date} at ${slot.startTime}.`
      });
    }

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get appointments for logged-in student
// @route  GET /api/appointments/my
const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ studentId: req.user._id })
      .populate('facultyId')
      .populate('slotId')
      .sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get appointments received by logged-in faculty
// @route  GET /api/appointments/faculty
const getFacultyAppointments = async (req, res) => {
  try {
    const faculty = await Faculty.findOne({ userId: req.user._id });
    if (!faculty) return res.status(404).json({ message: 'Faculty profile not found' });

    const appointments = await Appointment.find({ facultyId: faculty._id })
      .populate('studentId', 'name email phone_no department')
      .populate('slotId')
      .sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Approve or reject an appointment (faculty)
// @route  PUT /api/appointments/:id/status
const updateAppointmentStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

    appointment.status = status;
    await appointment.save();

    // Notify the student
    await Notification.create({
      userId:        appointment.studentId,
      appointmentId: appointment._id,
      message:       `Your appointment has been ${status} by the faculty.`
    });

    // If rejected, free the slot
    if (status === 'Rejected') {
      await TimeSlot.findByIdAndUpdate(appointment.slotId, { status: 'Available' });
    }

    res.json({ message: `Appointment ${status}`, appointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Cancel an appointment
// @route  PUT /api/appointments/:id/cancel
const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

    appointment.status = 'Cancelled';
    await appointment.save();

    // Free the slot
    await TimeSlot.findByIdAndUpdate(appointment.slotId, { status: 'Available' });

    res.json({ message: 'Appointment cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  bookAppointment,
  getMyAppointments,
  getFacultyAppointments,
  updateAppointmentStatus,
  cancelAppointment
};
