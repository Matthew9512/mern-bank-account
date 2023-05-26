export const UsersDetails = ({ data }) => {
   return (
      <>
         <div className='w-80 bg-gradient-to-r from-light-green to-dark-grey text-white rounded-lg relative mt-16 h-48'>
            <p className='rounded-full w-8 h-8 absolute top-6 left-6 bg-light-grey '></p>
            <p className='rounded-full w-8 h-8 absolute top-6 left-10 bg-dark-grey '></p>
            <p className='absolute top-6 right-6 tracking-wide text-lg font-bold'>$ {data.user?.totalMoney || 0}</p>
            <div className='absolute flex justify-evenly bottom-8 w-full tracking-widest'>
               <span>1234</span>
               <span>5678</span>
               <span>9123</span>
               <span>4567</span>
            </div>
         </div>
         <p className='pt-4'>
            Status: <span className='text-dark-green'>Active</span>
         </p>
         <p className='pt-2'>Type card: MasterCard</p>
      </>
   );
};
