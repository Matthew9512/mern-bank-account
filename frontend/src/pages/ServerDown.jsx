export const ServerDown = () => {
   console.log(`server`);
   return (
      <section className='error__page'>
         {/* <img className='error-img' src='../../../public/500.jpg' alt='' /> */}
         <div className='error-text-wrapper'>
            {/* <Link className='btn error-btn' to={'/'}> */}
            Go Back
            {/* </Link> */}
            <p className='error-text'>
               We have a little problem.
               <br />
               Looks like our server is currently down...
               <br />
               We are working to fix this problem, please come back later.
            </p>
         </div>
         <p className='attribution'>
            {/* <a href='https://www.freepik.com/free-vector/500-internal-server-error-concept-illustration_7906229.htm#query=server%20down&position=4&from_view=keyword&track=ais'> */}
            {/* Image by storyset */}
            {/* </a>{' '} */}
            {/* on Freepik */}
         </p>
      </section>
   );
};
