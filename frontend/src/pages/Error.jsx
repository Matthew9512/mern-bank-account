import { Link } from 'react-router-dom';

export const Error = () => {
   return (
      <section className='flex relative flex-col px-8 h-full justify-center items-center lg:flex-row lg:h-screen'>
         <img className='w-fill h-full object-cover' src='/404-robot-com.jpg' alt='error-page-img' />
         <div className='w-4/5 text-center lg:w-1/3'>
            <div className='flex flex-col pb-12 items-center'>
               <Link className='btn w-32 mb-4' to={'/'}>
                  Go Back
               </Link>
               <p>
                  We have a little problem called 404.
                  <br />
                  Looks like the page that you are were looking for doesn&apos;t exist.
                  <br />
                  You may have mistyped the address or page may have moved.
               </p>
            </div>
            <p className='absolute bottom-1 left-1/2 -translate-x-1/2 font-bold'>
               <a href='https://www.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_7906233.htm#page=2&query=404%20error&position=24&from_view=search&track=ais'>
                  Image by <span className='link'>storyset</span>
               </a>{' '}
               on Freepik
            </p>
         </div>
      </section>
   );
};
