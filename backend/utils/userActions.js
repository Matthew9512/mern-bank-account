const userModel = require('../models/userModel');
const crypto = require('crypto');

// limit of responses of accountMovements array
const _resLimit = 5;

//    update user that gets money from transaction
const updateTransactionToUser = async (body, id, user) => {
   await userModel.findOneAndUpdate(
      { accountNumber: body.transactionUser },
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

const searchUser = async (id) => {
   const userData = await userModel.findById(id);
   // length of accountMovements as number of pages
   const numberOfPages = Math.ceil(userData.accountMovements.length / _resLimit);

   return { userData, numberOfPages };
};

// unique number
const createUniqueNumber = () => crypto.randomBytes(8).toString('hex');

// check if created number already egsist in db
const checkUniqueNumber = async (accNumber) => await userModel.findOne({ accountNumber: accNumber });

const createUniqueAccNumber = async () => {
   let uniqueAccNumber = createUniqueNumber();
   let checkUniqueAccNumber = await checkUniqueNumber(uniqueAccNumber);

   // if created number already egsist in db create new one and check again
   if (checkUniqueAccNumber) {
      uniqueAccNumber = createUniqueNumber();
      checkUniqueAccNumber = await checkUniqueNumber(uniqueAccNumber);
   }
   return uniqueAccNumber;
};

module.exports = { updateTransactionToUser, _resLimit, searchUser, createUniqueAccNumber };
