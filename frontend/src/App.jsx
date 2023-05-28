import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { lazyLoad } from './utils/lazyLoad';
import { LoadingSpinner } from './components/LoadingSpinner';

const Welcome = lazyLoad('../pages/Welcome.jsx', 'Welcome');
const Login = lazyLoad('../pages/Login.jsx', 'Login');
const Register = lazyLoad('../pages/Register.jsx', 'Register');
const Account = lazyLoad('../pages/Account/Account.jsx', 'Account');
const Error = lazyLoad('../pages/Error.jsx', 'Error');
const NewTransaction = lazyLoad('../pages/NewTransaction.jsx', 'NewTransaction');
const ServerDown = lazyLoad('../pages/ServerDown.jsx', 'ServerDown');
const ProtectedRoute = lazyLoad('../components/ProtectedRoute.jsx', 'ProtectedRoute');

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
