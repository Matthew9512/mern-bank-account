const express = require('express');
const router = express.Router();
const verifyJwt = require('../middleware/verifyJwt');
const accountMovements = require('../controllers/accountMovements');

router.get('/user/:id', accountMovements.getUser);
router.get('/user/:id/q', accountMovements.getUsersTransactions);
router.post('/new-transaction', accountMovements.transferMoney);
router.get('/user/:id/monthly-transactions', accountMovements.getMonthlyTransactions);

module.exports = router;
