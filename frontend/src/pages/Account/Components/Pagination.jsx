import { useParams } from 'react-router-dom';
import { useAuthAxios } from '../../../hooks/useAuthAxios';
import { useEffect, useState } from 'react';
import { renderPagination } from '../../../utils/renderPagination';

export const Pagination = ({ setResData, numberOfPages }) => {
   const { fetchData, data, ready } = useAuthAxios();
   const { id } = useParams();
   const [currentPage, setCurrentPage] = useState(1);

   const nextPage = (e) => {
      let click = e.target.textContent;

      fetchData({
         url: `account/user/${id}/q?page=${click}`,
      });
      if (e.target.dataset.id === 'next') setCurrentPage((prev) => prev + 1);
      else setCurrentPage((prev) => prev - 1);
   };

   useEffect(() => {
      if (!ready) return;
      setResData(data);
      // page number here
   }, [ready, data]);

   return (
      <div onClick={nextPage} className='flex items-center justify-around pt-8 font-bold'>
         {renderPagination(currentPage, numberOfPages, setCurrentPage)}
      </div>
   );
};
