import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { authAxios } from '../utils/axiosHelpers';

authAxios.defaults.baseURL = `https://mern-bank-account.onrender.com`;
authAxios.defaults.withCredentials = true;
authAxios.defaults.timeout = 5000;

export const useAuthAxios = () => {
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(false);
   const [data, setData] = useState(false);
   const [ready, setReady] = useState(false);
   const navigate = useNavigate();
   const [messageApi, contextHolder] = message.useMessage();

   const fetchData = async (method) => {
      setLoading(true);
      try {
         const res = await authAxios.request(method);
         const resData = await res.data;
         setData(resData);
         setReady(true);
         if (resData?.message) messageApi.success(resData?.message, 2);
      } catch (error) {
         if (error.request.status === 0) return navigate('/server-down');
         messageApi.error(error.response.data?.message, 2);
         setError(error.response.data.message);
      } finally {
         setLoading(false);
      }
   };

   return { fetchData, data, loading, error, ready, contextHolder };
};
