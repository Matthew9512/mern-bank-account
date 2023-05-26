import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAxios } from '../hooks/useAxios';
import { LoadingButton } from '../components/LoadingButton';

export const Register = () => {
   const { fetchData, loading, ready, contextHolder } = useAxios();
   const usernameRef = useRef();
   const emailRef = useRef();
   const passwordRef = useRef();
   const navigate = useNavigate();

   const newUser = (e) => {
      e.preventDefault();
      fetchData({
         url: `/auth/signin`,
         method: `POST`,
         data: {
            username: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
         },
      });
   };

   useEffect(() => {
      if (!ready) return;
      setTimeout(() => {
         navigate('/login');
      }, 2000);
   }, [ready]);

   return (
      <form className='flex flex-col items-center justify-center gap-4 py-12 px-6 p-8 m-auto w-96 rounded-xl bg-white relative'>
         {contextHolder}
         <p className='text-center font-bold pb-6 text-xl'>Register new account</p>
         <input ref={usernameRef} type='text' placeholder='username' />
         <input ref={emailRef} type='text' placeholder='email' />
         <input ref={passwordRef} type='password' placeholder='password' />
         <p>
            Have an account?{' '}
            <Link className='link' to={'/login'}>
               log in
            </Link>
         </p>
         {loading ? (
            <LoadingButton />
         ) : (
            <button onClick={newUser} className='btn-primary mt-6'>
               Sign in
            </button>
         )}
      </form>
   );
};
