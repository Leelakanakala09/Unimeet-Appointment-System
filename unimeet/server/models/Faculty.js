const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  userId:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  facultyName: { type: String, required: true },
  department:  { type: String, required: true },
  email:       { type: String, required: true },
  designation: { type: String, default: 'Lecturer' }
}, { timestamps: true });

module.exports = mongoose.model('Faculty', facultySchema);
