import { message } from 'antd';
import { axiosInstance } from '../hooks/useAxios';
import jwtDecode from 'jwt-decode';

axiosInstance.interceptors.request.use(
   async (config) => {
      const token = getToken();
      if (token) {
         config.headers.Authorization = `Bearer ${token}`;
      } else {
         // token expired
         message.warning(`Your session has expired redirecting to home page...`, 3);
         return setTimeout(() => {
            location.assign('/');
         }, 3000);
      }
      return config;
   },
   (error) => {
      return Promise.reject(error);
   }
);

export const getToken = () => {
   const token = JSON.parse(sessionStorage.getItem('access__token'));
   if (token) {
      const { exp } = jwtDecode(token);
      if (exp < Date.now() / 1000) {
         // Access token has expired
         removeToken();
         return null;
      }
   }
   return token;
};

export const removeToken = () => {
   sessionStorage.removeItem('access__token');
};
