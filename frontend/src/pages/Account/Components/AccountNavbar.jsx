import { logOutIcon, userIcon } from '../../../utils/icons';
import { useAuthAxios } from '../../../hooks/useAuthAxios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { removeToken } from '../../../utils/axiosHelpers';
import { LoadingButton } from '../../../components/LoadingButton';

export const AccountNavbar = ({ data, id }) => {
   const { fetchData, contextHolder, ready, loading } = useAuthAxios();
   // const [rerender, setRerender] = useState(false);
   const navigate = useNavigate();
   const loanAmountRef = useRef();

   const logOut = () => {
      fetchData({
         url: '/auth/logout',
         method: 'POST',
      });
   };

   // const requestLoan = () => {
   //    loan = true;
   //    fetchData({
   //       url: '/account/new-transaction',
   //       method: 'POST',
   //       data: {
   //          moneyAmount: loanAmountRef.current.value,
   //          transactionUser: id,
   //          id: '64689e52f958fcc519efd815', // bank id
   //          loan: true,
   //       },
   //    });
   // };

   useEffect(() => {
      console.log(loan);
      if (!ready) return;
      setTimeout(() => {
         removeToken();
         navigate('/');
      }, 2000);
   }, [ready]);

   return (
      <nav className='p-2 flex flex-row-reverse justify-between items-center text-dark-grey border-b border-grey mb-4'>
         {contextHolder}
         <div className='flex gap-4 justify-end px-2 cursor-pointer'>
            {loading ? <LoadingButton /> : <span onClick={logOut}>{logOutIcon}</span>}
            <span className='flex gap-1'>
               {userIcon}
               {data.user?.username}
            </span>
         </div>
         {/*  */}
         {/* <div className='flex gap-4 w-40'>
            <button onClick={requestLoan}>Loan</button>
            <input ref={loanAmountRef} type='text' name='' id='' placeholder='1000' />
         </div> */}
         {/*  */}
      </nav>
   );
};
