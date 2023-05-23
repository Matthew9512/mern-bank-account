import { Link } from 'react-router-dom';
// import {} from '../../../public'
export const Error = () => {
   return (
      <section className='flex justify-center items-center h-screen p-8'>
         <img className='w-2/3 h-3/4 object-cover' src='../../../404-robot.jpg' alt='' />
         <div className='w-1/3'>
            <div className=''>
               <Link className='btn' to={'/'}>
                  Go Back
               </Link>
               <p className=''>
                  We have a little problem called 404.
                  <br />
                  Looks like the page that you are were looking for doesn't exist.
                  <br />
                  You may have mistyped the address or page may have moved.
               </p>
            </div>
            <p className=' '>
               <a href='https://www.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_7906233.htm#page=2&query=404%20error&position=24&from_view=search&track=ais'>
                  Image by storyset
               </a>{' '}
               on Freepik
            </p>
         </div>
      </section>
   );
};
