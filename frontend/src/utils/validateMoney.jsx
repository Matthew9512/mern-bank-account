// prevent typing more than 2 decimal numbers
export const validateMoneyInput = (e) => {
   var regex = /^\d{0,}(\.{0,1}\d{0,2})?$/;
   if (!regex.test(e.target.value)) {
      e.target.value = e.target.value.slice(0, -1);
   }
};
