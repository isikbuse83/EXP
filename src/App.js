import SignInPage from './components/SigninPage';
import SignUpPage from './components/SignUpPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import HomePage from './components/HomePage';
import { userAuthenticated } from './app/authenticationSlice';
import Navbar from './components/Navbar';
import { Navigate } from 'react-router-dom';
import React from 'react';
import { useEffect } from 'react';

const App = () => {
  const { isLoggedIn } = useSelector(state => state.authenticationSlice);

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
        <Route exact path='/' element={isLoggedIn ? <HomePage /> : <SignInPage />} />
        <Route path='/signup' exact element={<SignUpPage />} />
        <Route path='/signin' exact element={isLoggedIn ? <Navigate to='/' /> : <SignInPage />} />
        <Route path='*' element={<h2>Page Not Found!</h2>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;