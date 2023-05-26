import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { logOutIcon, userIcon, arrowDownIcon, removeAccount } from '../../../utils/icons';
import { useAuthAxios } from '../../../hooks/useAuthAxios';
import { removeToken } from '../../../utils/axiosHelpers';
import { LoadingButton } from '../../../components/LoadingButton';
import { LoanMoney } from './LoanMoney';

export const AccountNavbar = ({ data, id, setRerender }) => {
   const { fetchData, contextHolder, loading } = useAuthAxios();
   const navigate = useNavigate();

   const logOut = () => {
      message.success(`Logout successful`, 2);
      removeToken();
      setTimeout(() => {
         navigate('/');
      }, 2000);
   };

   const removeAcc = () => {
      fetchData({
         url: '/auth/delete',
         method: 'DELETE',
         data: { id },
      });
   };

   return (
      <>
         <nav className='p-2 flex flex-row-reverse justify-between items-center text-dark-grey border-b border-grey mb-4'>
            {contextHolder}
            <div className='dropdown relative'>
               <div className='flex items-center'>
                  <span className='flex gap-1'>
                     {userIcon}
                     {data.user?.username}
                  </span>
                  {arrowDownIcon}
               </div>
               {/* drop menu */}
               <ul className='dropdown-menu absolute flex flex-col justify-center right-1 w-48 z-50 p-4 rounded-lg hidden bg-grey'>
                  {loading ? (
                     <LoadingButton />
                  ) : (
                     <span className='flex gap-2 mb-2 cursor-pointer' onClick={logOut}>
                        {logOutIcon} Log out
                     </span>
                  )}
                  <span onClick={removeAcc} className='flex gap-2 cursor-pointer'>
                     {removeAccount} Delete account
                  </span>
               </ul>
            </div>
            <LoanMoney id={id} setRerender={setRerender} />
         </nav>
      </>
   );
};
