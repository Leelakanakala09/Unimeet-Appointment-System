const express = require('express');
const router  = express.Router();
const { getAllFaculty, getFacultyById, addTimeSlot, getSlots, deleteSlot } = require('../controllers/facultyController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.get('/',                    getAllFaculty);
router.get('/:id',                 getFacultyById);
router.post('/slots',              protect, authorizeRoles('faculty'), addTimeSlot);
router.get('/slots/:facultyId',    getSlots);
router.delete('/slots/:slotId',    protect, authorizeRoles('faculty'), deleteSlot);

module.exports = router;
