import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

axios.defaults.baseURL = `http://localhost:8000`;
axios.defaults.withCredentials = true;
axios.defaults.timeout = 5000;

export const useAxios = () => {
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(false);
   const [data, setData] = useState(false);
   const [ready, setReady] = useState(false);
   const navigate = useNavigate();
   const [messageApi, contextHolder] = message.useMessage();

   const fetchData = async (method) => {
      setLoading(true);
      try {
         const res = await axios.request(method);
         const resData = await res.data;
         console.log(res.data);
         setData(resData);
         setReady(true);
         if (resData?.message) messageApi.success(resData?.message, 2);
      } catch (error) {
         if (error.request.status === 0) return navigate('/server-down');
         console.log(error.response.data.message);
         messageApi.error(error.response.data?.message, 2);
         setError(error.response.data.message);
      } finally {
         setLoading(false);
      }
   };

   return { fetchData, data, loading, error, ready, contextHolder };
};
