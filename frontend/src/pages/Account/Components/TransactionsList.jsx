import { Link } from 'react-router-dom';
import { formatDistanceStrict } from 'date-fns';
import { useState } from 'react';
import { incomeIcon, paymentIcon } from '../../../utils/icons';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import { Pagination } from './Pagination';

export const TransactionsList = ({ data, loading }) => {
   const [resData, setResData] = useState(data.user);

   if (!resData) return <p>loading...</p>;

   return (
      <>
         <LoadingSpinner loading={loading} />
         <p className='font-bold text-lg'>Transactions:</p>
         {!resData?.accountMovements.length ? (
            <p className='pt-4'>No transactions yet </p>
         ) : (
            resData?.accountMovements.map((value) => {
               return (
                  <div key={value._id} className='py-2'>
                     {/* formated date */}
                     <p>{formatDistanceStrict(new Date(value.transactionDate), new Date(), { addSuffix: true })}</p>
                     <div className='flex justify-between py-2'>
                        <div className='flex gap-8'>
                           <p className={`border-l-4 pl-2 ${value.movementType === 'income' ? 'text-light-green' : 'text-red'} `}>
                              {value.movementType === 'income' ? incomeIcon : paymentIcon}
                           </p>
                           <p>{value.movementType === 'income' ? value.moneyAmount : -value.moneyAmount}$</p>
                        </div>
                        <p className='mr-8 font-bold first-letter:uppercase'>{value?.user}</p>
                     </div>
                  </div>
               );
            })
         )}
         <Pagination setResData={setResData} />
         <Link to={`/account/new-transaction/${resData._id}`} className='btn'>
            + New Transaction
         </Link>
      </>
   );
};
