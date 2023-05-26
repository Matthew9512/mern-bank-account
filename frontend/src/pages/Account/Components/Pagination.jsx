import { useParams } from 'react-router-dom';
import { useAuthAxios } from '../../../hooks/useAuthAxios';
import { useEffect, useRef, useState } from 'react';
import { arrowLeftIcon, arrowRightIcon } from '../../../utils/icons';

export const Pagination = ({ setResData, numberOfPages }) => {
   const { fetchData, data, ready, contextHolder } = useAuthAxios();
   const { id } = useParams();
   const [currentPage, setCurrentPage] = useState(1);
   let currentPageRef = useRef(1);

   const nextPage = (e) => {
      let click = e.target;
      // prevent action when click outside
      if (!click.dataset.action) return;

      if (click.dataset.action === 'next') currentPageRef.current++;
      else currentPageRef.current--;

      fetchData({
         url: `account/user/${id}/q?page=${currentPage}`,
      });
   };

   useEffect(() => {
      if (!ready) return;
      setResData(data);
      setCurrentPage(currentPageRef.current);
   }, [ready, data]);

   return (
      <div onClick={nextPage} className='flex items-center gap-8 mx-auto mt-4'>
         {contextHolder}
         <button
            className={`pagIcon ${currentPage === 1 ? 'disabled' : ''} rounded-full bg-light-white text-black`}
            disabled={currentPage === 1}
            data-action={'prev'}
         >
            {arrowLeftIcon}
         </button>
         <p className='font-bold'>{currentPage}</p>
         <button
            className={`pagIcon ${currentPage === numberOfPages ? 'disabled' : ''} rounded-full bg-light-white text-black`}
            disabled={currentPage === numberOfPages}
            data-action={'next'}
         >
            {arrowRightIcon}
         </button>
      </div>
   );
};
