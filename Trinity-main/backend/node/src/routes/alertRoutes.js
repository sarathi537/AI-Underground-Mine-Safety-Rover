const express = require('express');
const router = express.Router();
const { getAllAlerts } = require('../controllers/alertController');

router.route('/')
    .get(getAllAlerts);

module.exports = router;