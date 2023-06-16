const userModel = require('../models/userModel');
const { incomesSum, outcomesSum } = require('../utils/monthlyMovements');
const { updateTransactionToUser, searchUser, _resLimit } = require('../utils/userActions');

/**
 * @todo stop filtering arr
 */

// get users date with first page of transactions
const getUser = async (req, res, next) => {
   let page = 1;
   try {
      const { id } = req.params;

      if (!id) return res.status(404).json({ message: `No data provided` });

      // decoded users info
      const { userID } = req.user;

      if (id !== userID) return res.status(403).json({ message: `You are not authorized to access this information` });

      // const findUser = await userModel.findById(id).limit(3).sort({ $natural: 1 });
      const findUser = await userModel.findById(id).slice('accountMovements', -5);
      // res.status(200).json(findUser);
      // return;
      // input: "accountMovements",
      // sortBy: { "transactionDate": -1 }

      // .findById(id).sort({ accountMovements: 1 });
      // ==================
      // const findUser = await userModel.findById(id, { accountMovements: { $slice: [0, _resLimit] } });

      if (!findUser) return res.status(404).json({ message: `User not found` });

      const { userData, numberOfPages } = await searchUser(id);
      // monthly account movements based on current month
      const monthlyIncomesMovements = incomesSum(userData);
      const monthlyOutcomesMovements = outcomesSum(userData);

      const { password, updatedAt, __v, ...user } = findUser._doc;

      res.status(200).json({ user, monthlyIncomesMovements, monthlyOutcomesMovements, numberOfPages });
   } catch (error) {
      console.log(error);
      next(error);
   }
};
// const getUser = async (req, res, next) => {
//    try {
//       const { id } = req.params;

//       if (!id) return res.status(404).json({ message: `No data provided` });

//       // decoded users info
//       const { userID } = req.user;

//       if (id !== userID) return res.status(403).json({ message: `You are not authorized to access this information` });

//       const findUser = await userModel.findById(id, { accountMovements: { $slice: [0, _resLimit] } });

//       if (!findUser) return res.status(404).json({ message: `User not found` });

//       const { userData, numberOfPages } = await searchUser(id);
//       // monthly account movements based on current month
//       const monthlyIncomesMovements = incomesSum(userData);
//       const monthlyOutcomesMovements = outcomesSum(userData);

//       const { password, updatedAt, __v, ...user } = findUser._doc;

//       res.status(200).json({ user, monthlyIncomesMovements, monthlyOutcomesMovements, numberOfPages });
//    } catch (error) {
//       console.log(error);
//       next(error);
//    }
// };

// paginated users transactions
const getUsersTransactions = async (req, res, next) => {
   try {
      const { id } = req.params;
      const { page } = req.query;

      // decoded users info
      const { userID } = req.user;

      if (id !== userID) return res.status(403).json({ message: `You are not authorized to access this information` });

      const transactions = await userModel.findById(id).slice('accountMovements', page * -_resLimit, _resLimit);
      console.log(page * -_resLimit);
      const { accountMovements } = transactions._doc;
      res.status(200).json({ accountMovements });
   } catch (error) {
      console.log(error);
      next(error);
   }
};
// const getUsersTransactions = async (req, res, next) => {
//    try {
//       const { id } = req.params;
//       const { page } = req.query;

//       // decoded users info
//       const { userID } = req.user;

//       if (id !== userID) return res.status(403).json({ message: `You are not authorized to access this information` });

//       const transactions = await userModel.findById(id).slice('accountMovements', (page - 1) * _resLimit, _resLimit);

//       const { accountMovements } = transactions._doc;
//       res.status(200).json({ accountMovements });
//    } catch (error) {
//       console.log(error);
//       next(error);
//    }
// };

// make a new transaction
const transferMoney = async (req, res, next) => {
   try {
      const { moneyAmount, transactionUser, id } = req.body;

      if (!moneyAmount || !transactionUser || !id)
         return res.status(400).json({ message: `No enought information to complete transfer` });

      // decoded users info
      const { userID } = req.user;

      if (id !== userID) return res.status(403).json({ message: `You are not authorized to access this information` });

      // find user that will recive money
      // transactionUser => is a type of id
      const transactionTO = await userModel.findOne({ accountNumber: transactionUser });

      if (!transactionTO) return res.status(409).json({ message: `Cant make transaction, provided user dont egsist` });

      const findUser = await userModel.findById(id);

      const usersMoney = findUser.totalMoney;

      if (usersMoney === 0 || usersMoney < moneyAmount)
         return res.status(409).json({ message: `You have no enought money to make that kind of transaction` });

      // check if there is enought money to make transaction and calc how much money will user have after transaction
      const checkTransaction = usersMoney - moneyAmount;

      //    update user that gets money from transaction
      updateTransactionToUser(req.body, id, findUser.username);

      // update user that makes transaction
      await findUser
         .updateOne({
            $set: { totalMoney: checkTransaction },
            $addToSet: {
               accountMovements: {
                  movementType: 'outcome',
                  moneyAmount,
                  transactionUser,
                  user: transactionTO.username,
               },
            },
         })
         .orFail();

      res.status(200).json({ message: `Transaction successfull, you now have ${checkTransaction}$ left` });
   } catch (error) {
      console.log(error);
      next(error);
   }
};

// load money from bank
const loanMoney = async (req, res, next) => {
   const _bankAccNumber = '656c1cb64b8f9572';

   try {
      const { moneyAmount, id } = req.body;

      if (!moneyAmount || !id) return res.status(400).json({ message: `No enought information to complete transfer` });

      // decoded users info
      const { userID } = req.user;
      if (id !== userID) return res.status(403).json({ message: `You are not authorized to access this information` });

      // loan user === bank
      const findUser = await userModel.findOne({ accountNumber: _bankAccNumber });

      // find user that will recive money
      // transactionUser => is a type of id
      const transactionTO = await userModel.findById(id);

      //    update user that gets money from transaction
      updateTransactionToUser(
         { moneyAmount, transactionUser: transactionTO.accountNumber },
         _bankAccNumber,
         findUser.username
      );

      const checkTransaction = transactionTO.totalMoney + +moneyAmount;

      // update user that makes transaction
      await findUser
         .updateOne({
            $set: { totalMoney: findUser.totalMoney - +moneyAmount },
            $addToSet: {
               accountMovements: {
                  movementType: 'outcome',
                  moneyAmount,
                  transactionUser: transactionTO.username,
                  user: findUser.username,
               },
            },
         })
         .orFail();

      res.status(200).json({ message: `Your loan request was successful, your now have ${checkTransaction}$` });
   } catch (error) {
      console.log(error);
      next(error);
   }
};

module.exports = { getUser, transferMoney, getUsersTransactions, loanMoney };
