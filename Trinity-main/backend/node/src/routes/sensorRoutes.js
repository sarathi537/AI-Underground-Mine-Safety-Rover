const express = require('express');
const router = express.Router();
const { getAllSensors, updateSensor } = require('../controllers/sensorController');

router.route('/')
    .get(getAllSensors);

// This endpoint allows your hardware to push new data:
// POST /api/sensors/ch4 { "value": "4.5", "status": "Warning" }
router.route('/:id')
    .post(updateSensor);

module.exports = router;