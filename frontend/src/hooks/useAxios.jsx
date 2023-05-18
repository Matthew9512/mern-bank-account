import { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = `http://localhost:8000`;
// axios.defaults.withCredentials: true,
axios.defaults.timeout = 5000;

export const useAxios = () => {
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(false);
   const [data, setData] = useState(false);
   const [ready, setReady] = useState(false);

   const fetchData = async (method) => {
      //   setError(false);
      //   setReady(false);
      setLoading(true);
      try {
         const res = await axios.request(method);
         const resData = await res.data;
         console.log(res.data);
         setData(resData);
         setReady(true);
      } catch (error) {
         console.log(error.response.data.message);
         setError(error.response.data.message);
      } finally {
         setLoading(false);
      }
   };

   return { fetchData, data, loading, error, ready };
};
