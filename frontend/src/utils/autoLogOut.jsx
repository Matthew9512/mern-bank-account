import { message } from 'antd';
import { removeToken } from './axiosHelpers';

export const autoLogOut = (exp, iat) => {
   const expirationTimeInMiliseconds = (exp - iat) * 1000;
   setTimeout(logoutUser, expirationTimeInMiliseconds);

   clearTimeout(logoutUser);
};

// Function to perform logout
const logoutUser = () => {
   message.warning(`Your session has expired redirecting to home page...`, 3);
   removeToken();
   return setTimeout(() => {
      location.assign('/');
   }, 3000);
};
