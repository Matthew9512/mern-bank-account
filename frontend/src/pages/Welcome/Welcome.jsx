import React from 'react';
import { Link } from 'react-router-dom';

export const Welcome = () => {
   return (
      <div className='mx-auto pt-20'>
         <h1 className='text-3xl'>Expense tracker</h1>
         <p>
            To get started{' '}
            <Link className='link' to={'/login'}>
               log in
            </Link>{' '}
            or
            <Link className='link' to={'/register'}>
               {' '}
               create
            </Link>{' '}
            an account
         </p>
      </div>
   );
};
