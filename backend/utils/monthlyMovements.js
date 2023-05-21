/**
 * @todo stop filtering arr
 */

const incomesSum = (findUser) => {
   const date = new Date().getMonth() + 1;
   return findUser.accountMovements
      .filter((value) => {
         return value.transactionDate.getMonth() + 1 === date && value.movementType === 'income';
      })
      .reduce((acc, value) => {
         return acc + value.moneyAmount;
      }, 0);
};

const outcomesSum = (findUser) => {
   const date = new Date().getMonth() + 1;
   return findUser.accountMovements
      .filter((value) => {
         return value.transactionDate.getMonth() + 1 === date && value.movementType === 'outcome';
      })
      .reduce((acc, value) => {
         return acc + value.moneyAmount;
      }, 0);
};

module.exports = { incomesSum, outcomesSum };
