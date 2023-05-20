const userModel = require('../models/userModel');

const updateTransactionToUser = async (body, id, username) => {
   /**
    * @todo add date
    */

   //    update user that gets money from transaction
   await userModel.findByIdAndUpdate(body.transactionUser, {
      $inc: { totalMoney: body.moneyAmount },
      $addToSet: {
         accountMovements: {
            movementType: 'income',
            moneyAmount: body.moneyAmount,
            transactionUser: id,
            user: username,
         },
      },
   });
};

module.exports = updateTransactionToUser;
