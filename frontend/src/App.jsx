import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Welcome } from './pages/Welcome';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Account } from './pages/Account/Account';
import { Error } from './pages/Error';
import { NewTransaction } from './pages/NewTransaction';
import { ServerDown } from './pages/ServerDown';
import { ProtectedRoute } from './components/ProtectedRoute';

export const App = () => {
   return (
      <main className='container m-auto flex justify-center items-center min-h-screen'>
         {/* <main className='flex max-w-screen-2xl mx-auto min-h-screen bg-light-white '> */}
         <BrowserRouter>
            <Routes>
               <Route path='/' element={<Welcome />}></Route>
               <Route path='/login' element={<Login />}></Route>
               <Route path='/register' element={<Register />}></Route>
               <Route element={<ProtectedRoute />}>
                  <Route path='/account/user/:id' element={<Account />}></Route>
                  <Route path='/account/new-transaction/:id' element={<NewTransaction />}></Route>
               </Route>
               <Route path='/server-down' element={<ServerDown />}></Route>
               <Route path='/*' element={<Error />}></Route>
            </Routes>
         </BrowserRouter>
      </main>
   );
};
// export const App = () => {
//    return (
//       <main className='container m-auto flex justify-center items-center min-h-screen'>
//          {/* <main className='flex max-w-screen-2xl mx-auto min-h-screen bg-light-white '> */}
//          <BrowserRouter>
//             <Routes>
//                <Route path='/' element={<Welcome />}></Route>
//                <Route path='/login' element={<Login />}></Route>
//                <Route path='/register' element={<Register />}></Route>
//                <Route path='/account/user/:id' element={<Account />}></Route>
//                <Route path='/account/new-transaction/:id' element={<NewTransaction />}></Route>
//                <Route path='/server-down' element={<ServerDown />}></Route>
//                <Route path='/*' element={<Error />}></Route>
//             </Routes>
//          </BrowserRouter>
//       </main>
//    );
// };
