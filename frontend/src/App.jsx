import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { LoadingSpinner } from './components/LoadingSpinner';
import { Welcome } from './pages/Welcome';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Account } from './pages/Account/Account';
import { NewTransaction } from './pages/NewTransaction';
import { ServerDown } from './pages/ServerDown';
import { Error } from './pages/Error';

export const App = () => {
   return (
      <main className='container m-auto flex justify-center items-center min-h-screen'>
         <BrowserRouter>
            <Suspense fallback={<LoadingSpinner loading={true} />}>
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
            </Suspense>
         </BrowserRouter>
      </main>
   );
};
