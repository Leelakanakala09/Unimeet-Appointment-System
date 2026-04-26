const mongoose = require('mongoose');

const timeSlotSchema = new mongoose.Schema({
  facultyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true },
  date:      { type: String, required: true },
  startTime: { type: String, required: true },
  endTime:   { type: String, required: true },
  status:    { type: String, enum: ['Available', 'Booked'], default: 'Available' }
}, { timestamps: true });

module.exports = mongoose.model('TimeSlot', timeSlotSchema);
