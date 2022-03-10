import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Login from './pages/login/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GuestDetail from './pages/guestDetails/guestDetail';
import NotFound from './pages/notFound/notFound';
import Survey from './pages/survey/survey';
import 'bootstrap/dist/css/bootstrap.min.css';



ReactDOM.render(
  <React.StrictMode>
     <BrowserRouter>
     <Routes>
       <Route path='/' element={<Login />}/>
       <Route path='/login' element={<Login/>}/>
       <Route path='/guestdetails' element={<GuestDetail/>}/>
       <Route path='/survey' element={<Survey/>}/>
       <Route path="*" element={<NotFound/>}/>
     </Routes>
     </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
