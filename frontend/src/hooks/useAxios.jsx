import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

axios.defaults.baseURL = `https://mern-bank-account-production.up.railway.app/`;
axios.defaults.withCredentials = true;
axios.defaults.timeout = 5000;

export const axiosInstance = axios.create();

export const useAxios = (auth) => {
   // if auth is true then make req with jwt
   const axiosFun = auth ? axiosInstance : axios;

   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(false);
   const [data, setData] = useState(false);
   const [ready, setReady] = useState(false);
   const navigate = useNavigate();
   const [messageApi, contextHolder] = message.useMessage();

   const fetchData = async (method) => {
      setLoading(true);
      try {
         const res = await axiosFun.request(method);
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
