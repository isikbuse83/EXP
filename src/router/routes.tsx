import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignInPage from '../components/SigninPage';
import SignUpPage from '../components/SignUpPage';
import HomePage from '../components/HomePage';


interface RoutesProps {
  isLoggedIn: boolean;
}

const AppRoutes: React.FC<RoutesProps> = ({ isLoggedIn }) => {
  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <HomePage /> : <SignInPage/>} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/signin" element={isLoggedIn ? <Navigate to="/" /> : <SignInPage />} />
     
      <Route path="*" element={<h2>Page Not Found!</h2>} />
    </Routes>
  );
};

export default AppRoutes;
