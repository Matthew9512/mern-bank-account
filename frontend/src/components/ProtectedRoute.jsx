import { Outlet } from 'react-router-dom';
import { getToken } from '../utils/axiosHelpers';

export const ProtectedRoute = () => {
   // const token = getToken();

   // if (!token) return <p className='w-1/2'>You have to access to this information, please log in or create new account redirecting</p>;

   return (
      <>
         <Outlet />
      </>
   );
};
