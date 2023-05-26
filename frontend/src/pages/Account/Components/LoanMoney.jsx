import { useEffect, useRef } from 'react';
import { useAuthAxios } from '../../../hooks/useAuthAxios';
import { LoadingButton } from '../../../components/LoadingButton';
import { validateMoneyInput } from '../../../utils/validateMoney';

export const LoanMoney = ({ id, setRerender }) => {
   const loanAmountRef = useRef();
   const { fetchData, data, ready, loading, contextHolder } = useAuthAxios();

   const requestLoan = () => {
      fetchData({
         url: '/account/request-loan',
         method: 'POST',
         data: {
            moneyAmount: loanAmountRef.current.value,
            id,
         },
      });
   };

   useEffect(() => {
      if (!ready) return;
      setRerender((prev) => !prev);
   }, [ready, data]);

   return (
      <div className='flex flex-col lg:flex-row gap-4 w-40'>
         {contextHolder}
         <input
            onChange={validateMoneyInput}
            ref={loanAmountRef}
            className='w-48 placeholder:text-sm'
            type='number'
            placeholder='amount of load ($)'
         />
         {loading ? (
            <LoadingButton />
         ) : (
            <button className='my-px' onClick={requestLoan}>
               Loan
            </button>
         )}
      </div>
   );
};
