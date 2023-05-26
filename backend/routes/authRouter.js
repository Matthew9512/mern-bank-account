const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');
const verifyJwt = require('../middleware/verifyJwt');

router.post('/signin', auth.signIn);
router.post('/login', auth.logIn);
router.post('/logout', auth.logOut);
router.delete('/delete', verifyJwt, auth.deleteAcc);

module.exports = router;
