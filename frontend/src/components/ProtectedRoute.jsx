import { Outlet, Navigate } from 'react-router-dom';
import { getToken } from '../utils/axiosHelpers';

export const ProtectedRoute = () => {
   const token = getToken();

   if (!token) return <Navigate to={'/'} />;

   return (
      <>
         <Outlet />
      </>
   );
};
