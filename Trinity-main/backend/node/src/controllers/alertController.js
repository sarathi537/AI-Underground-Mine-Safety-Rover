const { alerts } = require('../models/mockData');

// @desc    Get all alerts and logs
// @route   GET /api/alerts
exports.getAllAlerts = (req, res) => {
    try {
        res.status(200).json({
            success: true,
            count: alerts.length,
            data: alerts
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};