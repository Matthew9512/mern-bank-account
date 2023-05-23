import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TransactionsList } from './Components/TransactionsList';
import { UsersDetails } from './Components/UsersDetails';
import { MontlyAccountOutcomes } from './Components/MontlyAccountOutcomes';
import { MontlyAccountIncomes } from './Components/MontlyAccountIncomes';
import { AccountNavbar } from './Components/AccountNavbar';
import { Footer } from './Components/Footer';
import { useAuthAxios } from '../../hooks/useAuthAxios';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export const Account = () => {
   const { fetchData, data, loading, error } = useAuthAxios();
   const { id } = useParams();

   useEffect(() => {
      fetchData({
         url: `/account/user/${id}`,
      });
   }, [id]);

   if (error) return <p>eeeee</p>;
   if (!data) return <LoadingSpinner loading={loading} />;

   return (
      <section className='w-4/5 mx-auto rounded-xl bg-white lg:w-4/5 xl:w-3/5'>
         {/* <section className='w-4/5 mx-auto my-16 rounded-xl bg-white lg:w-4/5 xl:w-3/5'> */}
         <AccountNavbar data={data} />
         <div className='flex flex-col justify-center items-center gap-8 px-12 py-8 lg:flex-row lg:items-start'>
            <div className='lg:border-r border-grey lg:w-1/2'>
               <div className='flex gap-4 ml-2 font-bold'>
                  <MontlyAccountOutcomes data={data} />
                  <MontlyAccountIncomes data={data} />
               </div>
               <UsersDetails data={data} />
            </div>
            {/* flex-col-reverse */}
            <div className='relative flex flex-col w-full overflow-y-auto lg:w-1/2 md:w-4/5 '>
               {/* <div className='relative flex flex-col w-full h-screen overflow-y-auto lg:w-1/2 md:w-4/5 '> */}
               {/* <div className='relative flex flex-col w-full h-[250px] overflow-y-auto lg:w-1/2 md:w-4/5 '> */}
               <TransactionsList data={data} loading={loading} />
            </div>
         </div>
         <Footer />
      </section>
   );
};
