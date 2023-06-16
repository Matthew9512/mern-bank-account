import { Link } from 'react-router-dom';
import { formatDistanceStrict } from 'date-fns';
import { useEffect, useState } from 'react';
import { incomeIcon, paymentIcon } from '../../../utils/icons';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import { Pagination } from './Pagination';

export const TransactionsList = ({ data }) => {
   const [resData, setResData] = useState();
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      setResData(data.user);
   }, [data]);

   if (!resData) return <LoadingSpinner loading={loading} />;

   return (
      <>
         <LoadingSpinner loading={loading} />
         <p className='font-bold text-lg'>Transactions:</p>
         {!resData?.accountMovements.length ? (
            <p className='pt-4'>No transactions history yet </p>
         ) : (
            <div className='flex flex-col-reverse'>
               {resData?.accountMovements.map((value) => {
                  return (
                     <div key={value._id} className='py-2'>
                        {/* formated date */}
                        <p>{formatDistanceStrict(new Date(value.transactionDate), new Date(), { addSuffix: true })}</p>
                        <div className='flex justify-between py-2'>
                           <div className='flex gap-8'>
                              <p
                                 className={`border-l-4 pl-2 ${
                                    value.movementType === 'income' ? 'text-light-green' : 'text-red'
                                 } `}
                              >
                                 {value.movementType === 'income' ? incomeIcon : paymentIcon}
                              </p>
                              <p>{value.movementType === 'income' ? value.moneyAmount : -value.moneyAmount}$</p>
                           </div>
                           <p className='mr-8 font-bold first-letter:uppercase'>{value?.user}</p>
                        </div>
                     </div>
                  );
               })}
            </div>
         )}
         {!data?.user?.accountMovements.length ? (
            ''
         ) : (
            <Pagination setResData={setResData} setLoading={setLoading} numberOfPages={data?.numberOfPages} />
         )}
         <Link to={`/account/new-transaction/${data.user?._id}`} className='btn'>
            + New Transaction
         </Link>
      </>
   );
};
