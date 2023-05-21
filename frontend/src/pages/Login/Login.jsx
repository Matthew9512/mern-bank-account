import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAxios } from '../../hooks/useAxios';
import jwtDecode from 'jwt-decode';

export const Login = () => {
   const passwordRef = useRef();
   const emailRef = useRef();
   const navigate = useNavigate();
   const { fetchData, data, loading, ready, error } = useAxios();

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
      const { userID } = jwtDecode(data?.accessToken);
      console.log(userID);
      navigate(`/account/user/${userID}`);
   }, [ready]);

   return (
      <>
         <form className='flex flex-col items-center justify-center gap-4 py-12 px-6 p-8 m-auto w-96 rounded-xl bg-white relative'>
            <p className='text-center font-bold pb-6 text-xl'>Log in</p>
            <input ref={emailRef} type='text' placeholder='email' />
            <input ref={passwordRef} type='password' placeholder='password' />
            <p>
               Dont have an account{' '}
               <Link className='link' to={'/register'}>
                  sign in
               </Link>
            </p>
            <button onClick={loginUser} className='mt-6'>
               Log in
            </button>
            <p className={`absolute inset-x-50% top-6 ${error ? '' : 'hidden'}`}>{error}</p>
         </form>
      </>
   );
};
