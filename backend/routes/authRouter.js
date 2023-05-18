const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');
const refreshJwt = require('../config/refreshJwt');

router.post('/signin', auth.signIn);
router.post('/login', auth.logIn);
router.delete('/delete', auth.deleteAcc);
router.get('/refresh', refreshJwt);

module.exports = router;
