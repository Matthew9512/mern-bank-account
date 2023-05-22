/**
 * @todo stop filtering arr
 */

// monthly incomes sum
const incomesSum = (userData) => {
   const date = new Date().getMonth() + 1;
   return userData.accountMovements
      .filter((value) => {
         return value.transactionDate.getMonth() + 1 === date && value.movementType === 'income';
      })
      .reduce((acc, value) => {
         return acc + value.moneyAmount;
      }, 0);
};

// monthly outcomes sum
const outcomesSum = (userData) => {
   const date = new Date().getMonth() + 1;
   return userData.accountMovements
      .filter((value) => {
         return value.transactionDate.getMonth() + 1 === date && value.movementType === 'outcome';
      })
      .reduce((acc, value) => {
         return acc + value.moneyAmount;
      }, 0);
};

module.exports = { incomesSum, outcomesSum };
