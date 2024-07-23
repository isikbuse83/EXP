import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userAuthenticated } from './app/authenticationSlice';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Routes from './router/routes';

const {CreateStore } = Redux;
const initialState=  {
    todo: [],
    posts: []
}



function Username (state = initialState , action)
{
   

}

const store = CreateStore(Username);