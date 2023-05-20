const userModel = require('../models/userModel');
const updateTransactionToUser = require('../utils/transactions');

const getUser = async (req, res, next) => {
   /**
    * @todo verifyJwt
    */
   try {
      const { id } = req.params;

      if (!id) return res.status(404).json({ message: `No data provided` });

      const findUser = await userModel.findById(id);

      if (!findUser) return res.status(404).json({ message: `User not found` });

      // decoded users info
      // const { userID } = req.user;

      // if (id !== userID) return res.status(403).json({ message: `You are not authorized to access this information` });

      const { password, updatedAt, __v, ...data } = findUser._doc;

      res.status(200).json(data);
   } catch (error) {
      console.log(error);
      next(error);
   }
};

const transferMoney = async (req, res, next) => {
   /**
    * @todo add date
    * @todo verifyJwt
    */
   try {
      const { moneyAmount, transactionUser, id } = req.body;

      if (!moneyAmount || !transactionUser || !id) return res.status(400).json({ message: `No enought information to complete transfer` });

      // decoded users info
      // const { userID } = req.user;

      // if (id !== userID) return res.status(403).json({ message: `You are not authorized to access this information` });

      // find user that will recive money
      // transactionUser => is a type of id
      const transactionTO = await userModel.findById(transactionUser);

      if (!transactionTO) return res.status(409).json({ message: `Cant make transaction, provided user dont egsist` });

      const findUser = await userModel.findById(id);

      //    update user that gets money from transaction
      updateTransactionToUser(req.body, id, findUser.username);

      // check if there is enought money to make transaction and calc how much money will user have after transaction
      const checkTransaction = findUser.totalMoney - moneyAmount;

      if (checkTransaction < 0) return res.status(409).json({ message: `You have no enought money to make that kind of transaction` });

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

      res.status(200).json({ message: `Transaction successfull, you now have ${checkTransaction}€ left` });
   } catch (error) {
      console.log(error);
      next(error);
   }
};

module.exports = { getUser, transferMoney };
