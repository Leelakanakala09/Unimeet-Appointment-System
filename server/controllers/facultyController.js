const Faculty  = require('../models/Faculty');
const TimeSlot = require('../models/TimeSlot');

// @desc   Get all faculty
// @route  GET /api/faculty
const getAllFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.find();
    res.json(faculty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get single faculty by ID
// @route  GET /api/faculty/:id
const getFacultyById = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    if (!faculty) return res.status(404).json({ message: 'Faculty not found' });
    res.json(faculty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Add a time slot (faculty only)
// @route  POST /api/faculty/slots
const addTimeSlot = async (req, res) => {
  const { date, startTime, endTime } = req.body;
  try {
    const faculty = await Faculty.findOne({ userId: req.user._id });
    if (!faculty) return res.status(404).json({ message: 'Faculty profile not found' });

    const slot = await TimeSlot.create({ facultyId: faculty._id, date, startTime, endTime });
    res.status(201).json(slot);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get available slots for a faculty
// @route  GET /api/faculty/slots/:facultyId
const getSlots = async (req, res) => {
  try {
    const slots = await TimeSlot.find({ facultyId: req.params.facultyId, status: 'Available' });
    res.json(slots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Delete a time slot (faculty only)
// @route  DELETE /api/faculty/slots/:slotId
const deleteSlot = async (req, res) => {
  try {
    await TimeSlot.findByIdAndDelete(req.params.slotId);
    res.json({ message: 'Slot deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllFaculty, getFacultyById, addTimeSlot, getSlots, deleteSlot };
