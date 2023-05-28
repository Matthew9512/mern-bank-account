import { Link } from 'react-router-dom';

export const Welcome = () => {
   return (
      <div className='mx-auto overflow-hidden h-screen flex justify-center items-center flex-col lg:flex-row '>
         <div className='p-8 font-bold '>
            <h1 className='text-4xl font-bold tracking-wider text-light-green'>Bankers</h1>
            <p className='py-8'>
               Lorem ipsum dolor sit amet consectetur <br /> adipisicing elit. Numquam et eum tempora culpa vero error?
            </p>
            <span>Get Started Now</span>
            <p className='pt-8 leading-[3rem] text-left'>
               <Link className='btn' to={'/login'}>
                  Log In
               </Link>
               <span className='px-4'>OR</span>
               <Link className='btn' to={'/register'}>
                  Creating New Account
               </Link>
            </p>
         </div>
         <img className='lg:w-[55vw] w-full object-cover' src='../../bank-people-com.jpg' alt='home-page-bank-img' />
         <div className='absolute bottom-2 font-bold'>
            <a href='https://www.freepik.com/free-vector/banking-industry-concept-illustration_35262247.htm#query=bank&position=21&from_view=search&track=sph'>
               Image by <span className='link'>storyset</span>
            </a>{' '}
            on Freepik
         </div>
      </div>
   );
};
