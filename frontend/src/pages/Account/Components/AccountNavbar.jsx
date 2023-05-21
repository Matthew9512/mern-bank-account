import { logOutIcon, userIcon } from '../../../utils/icons';

export const AccountNavbar = ({ data }) => {
   const logOut = () => {
      console.log(`logout`);
   };

   return (
      <nav className='p-2 text-dark-grey border-b border-grey mb-4'>
         <div className='flex gap-4 justify-end px-2 cursor-pointer'>
            <span onClick={logOut}>{logOutIcon}</span>
            <div className='dropdown dropdown-end'>
               <label tabIndex={0} className='flex gap-1'>
                  {userIcon} {data.user?.username}
               </label>
               <ul tabIndex={0} className='dropdown-content menu p-1 shadow bg-base-100 rounded-box w-52'>
                  <li>
                     <a>Item 1</a>
                  </li>
                  <li>
                     <a>Item 2</a>
                  </li>
               </ul>
            </div>
         </div>
      </nav>
   );
   // return (
   //    <nav className=' p-2 text-dark-grey border-b border-grey mb-4'>
   //       <div className='flex gap-4 justify-end px-2 cursor-pointer'>
   //          <span onClick={logOut}>{logOutIcon}</span>
   //          <span className='flex gap-1'>
   //             {userIcon}
   //             {data?.username}
   //          </span>
   //       </div>
   //    </nav>
   // );
};
