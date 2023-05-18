import React from 'react';
import { AccountMovements } from './Components/AccountMovements';
import { Settings } from './Components/Settings';
import { TotalMoney } from './Components/TotalMoney';

export const Account = () => {
   return (
      <section className=''>
         <AccountMovements />
         <Settings />
         <TotalMoney />
      </section>
   );
};
