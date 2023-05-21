import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Welcome } from './pages/Welcome/Welcome';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { Account } from './pages/Account/Account';
import { Error } from './pages/Error/Error';
import { NewTransaction } from './pages/NewTransaction';

export const App = () => {
   return (
      <main className='flex max-w-screen-2xl mx-auto min-h-screen bg-light-white '>
         <BrowserRouter>
            <Routes>
               <Route path='/' element={<Welcome />}></Route>
               <Route path='/login' element={<Login />}></Route>
               <Route path='/register' element={<Register />}></Route>
               <Route path='/account/user/:id' element={<Account />}></Route>
               <Route path='/account/new-transaction/:id' element={<NewTransaction />}></Route>
               <Route path='/*' element={<Error />}></Route>
            </Routes>
         </BrowserRouter>
      </main>
   );
};
