const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User',      required: true },
  facultyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty',   required: true },
  slotId:    { type: mongoose.Schema.Types.ObjectId, ref: 'TimeSlot',  required: true },
  purpose:   { type: String, required: true },
  status:    { type: String, enum: ['Pending', 'Approved', 'Rejected', 'Cancelled'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
