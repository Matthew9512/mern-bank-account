import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAxios } from '../hooks/useAxios';
import { LoadingButton } from '../components/LoadingButton';

export const Register = () => {
   const { fetchData, loading, ready, contextHolder } = useAxios(false);
   const usernameRef = useRef();
   const emailRef = useRef();
   const passwordRef = useRef();
   const navigate = useNavigate();

   const newUser = (e) => {
      e.preventDefault();

      if (!emailRef.current.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return;
      if (passwordRef.current?.value.length < 3 || usernameRef.current?.value.length < 3 || !emailRef.current.value)
         return;

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
         <input ref={usernameRef} minLength={3} type='text' placeholder='username' className='invalid' />
         <input ref={emailRef} type='email' placeholder='email' className='invalid' />
         <input ref={passwordRef} minLength={3} type='password' placeholder='password' className='invalid' />
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
