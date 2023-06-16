import { Link } from 'react-router-dom';

export const ServerDown = () => {
   return (
      <section className='flex relative flex-col px-8 h-full justify-center items-center lg:flex-row lg:h-screen'>
         <img className='w-fill h-full object-cover' src='/500-com.jpg' alt='server-down-img' />
         <div className='w-4/5 text-center lg:w-1/3'>
            <div className='flex flex-col pb-12 items-center'>
               <Link className='btn w-32 mb-4' to={'/'}>
                  Go Back
               </Link>
               <p>
                  We have a little problem.
                  <br />
                  Looks like our server is currently down...
                  <br />
                  We are working to fix this problem, please come back later.
               </p>
            </div>
            <p className='absolute bottom-1 left-1/2 -translate-x-1/2  font-bold'>
               <a href='https://www.freepik.com/free-vector/500-internal-server-error-concept-illustration_7906229.htm#query=server%20down&position=4&from_view=keyword&track=ais'>
                  Image by <span className='link'>storyset</span>
               </a>{' '}
               on Freepik
            </p>
         </div>
      </section>
   );
};
