import { Outlet, Navigate } from 'react-router-dom';
import { getToken } from '../utils/axiosHelpers';
import jwtDecode from 'jwt-decode';
import { autoLogOut } from '../utils/autoLogOut';

export const ProtectedRoute = () => {
   const token = getToken();

   if (!token) return <Navigate to={'/'} />;

   // auto logout when token expired
   const { exp, iat } = jwtDecode(token);
   autoLogOut(exp, iat);

   return (
      <>
         <Outlet />
      </>
   );
};
