import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAxios } from '../../hooks/useAxios';

export const Register = () => {
   const { fetchData, data, loading, error, ready } = useAxios();
   const usernameRef = useRef();
   const emailRef = useRef();
   const passwordRef = useRef();

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
      // message git
   }, [ready]);

   return (
      <form className='flex flex-col items-center justify-center gap-4 py-12 px-6 p-8 m-auto w-96 rounded-xl bg-white relative'>
         <p className='text-center font-bold pb-6 text-xl'>Log in</p>
         <input ref={usernameRef} type='text' placeholder='username' />
         <input ref={emailRef} type='text' placeholder='email' />
         <input ref={passwordRef} type='password' placeholder='password' />
         <p>
            Have an account?{' '}
            <Link className='link' to={'/login'}>
               log in
            </Link>
         </p>
         <button onClick={newUser} className='btn-primary mt-6'>
            Sign in
         </button>
      </form>
   );
};
