const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
   username: String,
   email: String,
   password: String,
   totalMoney: Number,
   accountNumber: Number,
   accountMovements: [
      {
         movementType: String,
         moneyAmount: Number,
         transactionUser: String,
         user: String,
         transactionDate: { type: Date, default: Date.now },
      },
   ],
});

module.exports = mongoose.model('User', userSchema);
