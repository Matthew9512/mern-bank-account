import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const authAxios = axios.create();

authAxios.interceptors.request.use(
   async (config) => {
      const token = getToken();

      if (token) {
         config.headers.Authorization = `Bearer ${token}`;
      } else {
         const newToken = await refreshAccessToken();
         config.headers.Authorization = `Bearer ${newToken}`;
      }

      return config;
   },
   (error) => {
      return Promise.reject(error);
   }
);

export const refreshAccessToken = async () => {
   try {
      const response = await axios.get(`/auth/refresh`);
      const newToken = response.data.accessToken;
      localStorage.setItem('access__token', JSON.stringify(newToken));
      return newToken;
   } catch (error) {
      console.log(error);
   }
};

export const getToken = () => {
   const token = JSON.parse(localStorage.getItem('access__token'));
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
   localStorage.removeItem('access__token');
};
