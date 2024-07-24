import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userAuthenticated } from './app/authenticationSlice';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import SignInPage from './components/SigninPage';
import SignUpPage from './components/SignUpPage';

const App = () => {
  const isLoggedIn = useSelector(state => state.authentication.isLoggedIn);
  const state = useSelector(state => state);
  console.log('current state: ', state);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token !== undefined && token !== null) {
      dispatch(userAuthenticated({ token }));
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={isLoggedIn ? <HomePage /> : <SignInPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/signin' element={isLoggedIn ? <Navigate to='/' /> : <SignInPage />} />
        <Route path='*' element={<h2>Page Not Found!</h2>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
