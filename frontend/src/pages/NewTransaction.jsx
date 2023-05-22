import { useEffect, useRef } from 'react';
import { useAxios } from '../hooks/useAxios';
import { useParams, useNavigate } from 'react-router-dom';
import { LoadingButton } from '../components/LoadingButton';
import { Message } from '../components/Message';

export const NewTransaction = () => {
   const { fetchData, data, loading, error, ready } = useAxios();
   const recipientRef = useRef();
   const amountRef = useRef();
   const { id } = useParams();
   const navigate = useNavigate();

   const makeTransaction = (e) => {
      e.preventDefault();
      if (!amountRef.current.value || !recipientRef.current.value) return; // message

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

   useEffect(() => {
      if (!ready) return;
      //  ==> message <==
      setTimeout(() => {
         navigate(-1);
      }, 2000);
   }, [ready]);

   return (
      <>
         <Message />
         <form className='flex flex-col items-start justify-center py-12 px-6 p-8 m-auto w-96 rounded-xl bg-white relative'>
            <p className='font-bold tracking-wide pb-4 mx-auto'>Make a new transaction</p>
            <label className='pt-4' htmlFor='account-number'>
               Reciver
            </label>
            <input ref={recipientRef} type='text' id='account-number' placeholder='Type account number' />
            <label className='pt-4' htmlFor='amount-money'>
               Sum
            </label>
            <input ref={amountRef} type='number' id='amount-money' placeholder='Type amount of money ($)' />
            <label className='pt-4' htmlFor='title'>
               Title
            </label>
            <input type='text' id='title' placeholder='Type title of transaction' />
            <div className='mt-12 mx-auto'>{loading ? <LoadingButton /> : <button onClick={makeTransaction}>Send transaction</button>}</div>
         </form>
      </>
   );
};
