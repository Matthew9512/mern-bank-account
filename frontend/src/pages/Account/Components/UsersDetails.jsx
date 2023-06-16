export const UsersDetails = ({ data }) => {
   const accNumber = data?.user?.accountNumber.match(/.{1,4}/g);
   return (
      <>
         <div className='test w-80 bg-gradient-to-r from-light-green to-dark-grey text-white rounded-lg relative mt-16 h-48'>
            <p className='rounded-full w-8 h-8 absolute top-6 left-6 bg-light-grey '></p>
            <p className='rounded-full w-8 h-8 absolute top-6 left-10 bg-dark-grey '></p>
            <p className='absolute top-6 right-6 tracking-wide text-lg font-bold'>$ {data.user?.totalMoney}</p>
            <div className='absolute flex justify-evenly bottom-8 w-full tracking-widest'>
               <span>{accNumber.at(0)}</span>
               <span>{accNumber.at(1)}</span>
               <span>{accNumber.at(2)}</span>
               <span>{accNumber.at(3)}</span>
            </div>
         </div>
         <p className='pt-4'>
            Status: <span className='text-dark-green'>Active</span>
         </p>
         <p className='pt-2'>Type card: MasterCard</p>
      </>
   );
};
