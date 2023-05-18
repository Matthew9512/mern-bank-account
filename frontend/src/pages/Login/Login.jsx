import { useContext, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserDataContext } from '../../context/UserDataContext';
import { useAxios } from '../../hooks/useAxios';

export const Login = () => {
   const { setUserData } = useContext(UserDataContext);
   const passwordRef = useRef();
   const emailRef = useRef();
   const navigate = useNavigate();
   const { fetchData, data, ready, error } = useAxios();

   const loginUser = (e) => {
      e.preventDefault();
      fetchData({
         url: '/auth/login',
         method: 'POST',
         data: {
            email: emailRef.current.value,
            password: passwordRef.current.value,
         },
      });
   };

   useEffect(() => {
      if (!ready) return;
      navigate('/account');
      setUserData(data);
   }, [ready]);

   return (
      <>
         <form className='flex flex-col items-center justify-center h-96 gap-4 p-6 m-auto w-80 rounded-xl bg-slate-400 h-2xl relative'>
            <input ref={passwordRef} className='file-input-bordered' type='text' placeholder='password' />
            <input ref={emailRef} className='file-input-bordered' type='text' placeholder='email' />
            <p>
               Dont have an account{' '}
               <Link className='link' to={'/register'}>
                  sign in
               </Link>
            </p>
            <button onClick={loginUser} className='btn-primary mt-6'>
               Log in
            </button>
            <p className={`absolute inset-x-50% top-6 ${error ? '' : 'hidden'}`}>{error}</p>
         </form>
      </>
   );
};
