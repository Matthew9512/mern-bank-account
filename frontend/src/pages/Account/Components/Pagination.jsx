import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useAxios } from '../../../hooks/useAxios';
import { arrowLeftIcon, arrowRightIcon } from '../../../utils/icons';

export const Pagination = ({ setResData, setLoading, numberOfPages }) => {
   const { fetchData, data, ready, contextHolder } = useAxios(true);
   const { id } = useParams();
   const [currentPage, setCurrentPage] = useState(1);
   let currentPageRef = useRef(1);

   const nextPage = (e) => {
      let click = e.target;
      // prevent action when click outside
      if (click.closest('.pagIcon').classList.contains('disabled')) return;
      if (!click.dataset.action) return;

      if (click.dataset.action === 'next') currentPageRef.current++;
      else currentPageRef.current--;

      setLoading(true);
      fetchData({
         url: `account/user/${id}/q?page=${currentPageRef.current}`,
      });
   };

   useEffect(() => {
      if (!ready) return;
      setResData(data);
      setCurrentPage(currentPageRef.current);
      setLoading(false);
   }, [ready, data]);

   return (
      <div onClick={nextPage} className='flex items-center gap-8 mx-auto mt-4'>
         {contextHolder}
         <button
            className={`pagIcon ${
               currentPage === 1 ? 'disabled' : ''
            } rounded-full font-bold text-lg bg-light-white text-black`}
            disabled={currentPage === 1}
            data-action={'prev'}
         >
            {arrowLeftIcon}
         </button>
         <p className='font-bold'>{currentPage}</p>
         <button
            className={`pagIcon ${
               currentPage === numberOfPages ? 'disabled' : ''
            } rounded-full font-bold bg-light-white text-black`}
            disabled={currentPage === numberOfPages}
            data-action={'next'}
         >
            {arrowRightIcon}
         </button>
      </div>
   );
};
