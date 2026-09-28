const { sensors } = require('../models/mockData');

// @desc    Get all sensor readings
// @route   GET /api/sensors
exports.getAllSensors = (req, res) => {
    try {
        res.status(200).json({
            success: true,
            count: sensors.length,
            data: sensors
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Update a specific sensor reading (Useful for hardware ingestion)
// @route   POST /api/sensors/:id
exports.updateSensor = (req, res) => {
    const { id } = req.params;
    const { value, status } = req.body;

    const sensorIndex = sensors.findIndex(s => s.id === id);

    if (sensorIndex === -1) {
        return res.status(404).json({ success: false, message: 'Sensor not found' });
    }

    // Update the sensor data in memory
    sensors[sensorIndex].value = value || sensors[sensorIndex].value;
    sensors[sensorIndex].status = status || sensors[sensorIndex].status;

    res.status(200).json({
        success: true,
        data: sensors[sensorIndex]
    });
};