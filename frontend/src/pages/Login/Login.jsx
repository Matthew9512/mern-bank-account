import React from 'react';
import { Link } from 'react-router-dom';

export const Login = () => {
   return (
      <>
         <form className='flex flex-col items-center justify-center h-96 gap-4 p-6 m-auto w-80 rounded-xl bg-slate-400 h-2xl'>
            <input className='file-input-bordered' type='text' placeholder='password' />
            <input className='file-input-bordered' type='text' placeholder='email' />
            <p>
               Dont have an account{' '}
               <Link className='link' to={'/register'}>
                  sign in
               </Link>
            </p>
            <button className='btn-primary mt-6'>Log in</button>
         </form>
      </>
   );
};
