const User          = require('../models/User');
const Faculty       = require('../models/Faculty');
const bcrypt        = require('bcryptjs');
const generateToken = require('../utils/generateToken');

// @desc   Register new user
// @route  POST /api/auth/register
const registerUser = async (req, res) => {
  const { name, email, password, role, department, phone_no, designation } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const salt           = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashedPassword, role, department, phone_no });

    // If registering as faculty, also create a Faculty profile
    if (role === 'faculty') {
      await Faculty.create({
        userId:      user._id,
        facultyName: name,
        department:  department || 'General',
        email,
        designation: designation || 'Lecturer'
      });
    }

    res.status(201).json({
      _id:   user._id,
      name:  user.name,
      email: user.email,
      role:  user.role,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Login user
// @route  POST /api/auth/login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id:   user._id,
        name:  user.name,
        email: user.email,
        role:  user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get logged in user profile
// @route  GET /api/auth/profile
const getProfile = async (req, res) => {
  res.json(req.user);
};

module.exports = { registerUser, loginUser, getProfile };
