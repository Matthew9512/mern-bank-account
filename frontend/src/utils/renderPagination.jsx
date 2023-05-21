import { arrowLeftIcon, arrowRightIcon } from './icons';

export const renderPagination = (currentPage, numberOfPages) => {
   let nextPage = currentPage + 1;
   let prevPage = currentPage - 1;

   // im on page 1 and there are other pages
   if (currentPage === 1 && numberOfPages > 1) {
      return (
         <>
            <button className='bg-light-grey invisible'></button>
            <p className='text-light-green'>{currentPage}</p>
            <button data-id={'next'} className='bg-light-grey flex gap-4'>
               {nextPage} {arrowRightIcon}
            </button>
         </>
      );
   }
   // im on page other than first and last
   if (currentPage < numberOfPages) {
      return (
         <>
            <button className='bg-light-grey flex gap-4'>
               {arrowLeftIcon} {prevPage}
            </button>
            <p className='text-light-green flex gap-4'>{currentPage}</p>
            <button data-id={'next'} className='bg-light-grey flex gap-4'>
               {nextPage} {arrowRightIcon}
            </button>
         </>
      );
   }
   // im on last page
   if (currentPage === numberOfPages && numberOfPages > 1) {
      return (
         <>
            <button className='bg-light-grey flex gap-4'>
               {arrowLeftIcon} {prevPage}
            </button>
            <p className='text-light-green'>{currentPage}</p>
            <button data-id={'next'} className='bg-light-grey invisible'></button>
         </>
      );
   }
   // only one page
   else {
      return (
         <>
            <button className='bg-light-grey invisible'></button>
            <p className='text-light-green'>{currentPage}</p>
            <button data-id={'next'} className='bg-light-grey invisible'></button>
         </>
      );
   }
};
