const express = require('express');
const router = express.Router();
const accountMovements = require('../controllers/accountMovements');

router.get('/user/:id', accountMovements.getUser);
router.get('/user/:id/q', accountMovements.getUsersTransactions);
router.post('/new-transaction', accountMovements.transferMoney);
router.post('/loan', accountMovements.loanMoney);

module.exports = router;
