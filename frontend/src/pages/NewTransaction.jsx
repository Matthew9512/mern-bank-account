import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAxios } from '../hooks/useAxios';
import { LoadingButton } from '../components/LoadingButton';
import { validateMoneyInput } from '../utils/validateMoney';

export const NewTransaction = () => {
   const { fetchData, loading, contextHolder } = useAxios(true);
   const recipientRef = useRef();
   const amountRef = useRef();
   const { id } = useParams();

   const makeTransaction = (e) => {
      e.preventDefault();
      if (!amountRef.current.value || !recipientRef.current.value) return;

      fetchData({
         url: `account/new-transaction`,
         method: `POST`,
         data: {
            moneyAmount: amountRef.current.value,
            transactionUser: recipientRef.current.value,
            id,
         },
      });
   };

   return (
      <>
         {contextHolder}
         <form className='flex flex-col items-start justify-center py-12 px-6 p-8 m-auto w-96 rounded-xl bg-white relative'>
            <p className='font-bold tracking-wide pb-4 mx-auto'>Make a new transaction</p>
            <label className='pt-4' htmlFor='account-number'>
               Reciver
            </label>
            <input
               ref={recipientRef}
               minLength={1}
               className='invalid'
               type='text'
               id='account-number'
               placeholder='Type account number'
               defaultValue={`faf621f3311bde71`}
            />
            <label className='pt-4' htmlFor='amount-money'>
               Sum
            </label>
            <input
               onChange={validateMoneyInput}
               ref={amountRef}
               minLength={1}
               className='invalid'
               type='number'
               id='amount-money'
               placeholder='Type amount of money ($)'
            />
            <label className='pt-4' htmlFor='title'>
               Title
            </label>
            <input type='text' id='title' placeholder='Type title of transaction' />
            <div className='mt-12 mx-auto'>
               {loading ? <LoadingButton /> : <button onClick={makeTransaction}>Send transaction</button>}
            </div>
         </form>
      </>
   );
};
