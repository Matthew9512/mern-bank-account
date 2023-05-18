const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
   username: String,
   email: String,
   password: String,
   totalMoney: Number,
   accountMovements: [
      {
         movementType: String,
         moneyAmount: Number,
         transactionUser: String,
         transactionDate: Date,
      },
   ],
});

module.exports = mongoose.model('User', userSchema);
