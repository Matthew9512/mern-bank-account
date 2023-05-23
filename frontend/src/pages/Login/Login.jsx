import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { useAxios } from '../../hooks/useAxios';
import { LoadingButton } from '../../components/LoadingButton';

export const Login = () => {
   const passwordRef = useRef();
   const emailRef = useRef();
   const navigate = useNavigate();
   const { fetchData, data, loading, ready, contextHolder } = useAxios();

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
      localStorage.setItem('access__token', JSON.stringify(data?.accessToken));
      navigate(`/account/user/${userID}`);
   }, [ready]);

   return (
      <>
         {contextHolder}
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
            {loading ? (
               <LoadingButton />
            ) : (
               <button onClick={loginUser} className='mt-6'>
                  Log in
               </button>
            )}
         </form>
      </>
   );
};
