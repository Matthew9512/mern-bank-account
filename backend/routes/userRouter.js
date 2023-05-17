const express = require('express');
const router = express.Router();
const user = require('../controllers/user');

router.post('/signin', user.signIn);
router.post('/login', user.logIn);

module.exports = router;
