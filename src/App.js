import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userAuthenticated } from './app/authenticationSlice';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Routes from './router/routes';


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
      <Routes isLoggedIn={isLoggedIn} />
    </BrowserRouter>
  );
};

export default App;
