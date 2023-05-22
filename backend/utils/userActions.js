const userModel = require('../models/userModel');

// limit of responses of accountMovements array
const _resLimit = 5;

//    update user that gets money from transaction
const updateTransactionToUser = async (body, id, user) => {
   await userModel.findByIdAndUpdate(body.transactionUser, {
      $inc: { totalMoney: body.moneyAmount },
      $addToSet: {
         accountMovements: {
            movementType: 'income',
            moneyAmount: body.moneyAmount,
            transactionUser: id,
            user,
         },
      },
   });
};

const searchUser = async (id) => {
   const userData = await userModel.findById(id);
   // length of accountMovements as number of pages
   const numberOfPages = Math.ceil(userData.accountMovements.length / _resLimit);

   return { userData, numberOfPages };
};

module.exports = { updateTransactionToUser, _resLimit, searchUser };
