const express = require('express');
const router = express.Router();
const dashboard = require('../controllers/dashboard');

router.get('/id', dashboard.getUserData);

module.exports = router;
