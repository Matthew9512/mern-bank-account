const userModel = require('../models/userModel');

const _resLimit = 6;

const updateTransactionToUser = async (body, id, user) => {
   /**
    * @todo add date
    */

   //    update user that gets money from transaction
   await userModel.findOneAndUpdate(
      { id: body.transactionUser },
      {
         $inc: { totalMoney: body.moneyAmount },
         $addToSet: {
            accountMovements: {
               movementType: 'income',
               moneyAmount: body.moneyAmount,
               transactionUser: id,
               user,
            },
         },
      }
   );
};

module.exports = { updateTransactionToUser, _resLimit };
