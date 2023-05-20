const express = require('express');
const router = express.Router();
const verifyJwt = require('../middleware/verifyJwt');
const accountMovements = require('../controllers/accountMovements');

router.get('/:id', accountMovements.getUser);
router.post('/transaction', accountMovements.transferMoney);

module.exports = router;
