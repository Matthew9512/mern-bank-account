import { useParams } from 'react-router-dom';
import { useAxios } from '../../../hooks/useAxios';
import { useEffect, useState } from 'react';
import { renderPagination } from '../../../utils/renderPagination';

export const Pagination = ({ setResData }) => {
   const { fetchData, data, ready } = useAxios();
   const { id } = useParams();
   const numberOfPages = 5;
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
   }, [ready, data]);

   return (
      <div onClick={nextPage} className='flex items-center justify-around pt-8 font-bold'>
         {renderPagination(currentPage, numberOfPages, setCurrentPage)}
      </div>
   );
};
