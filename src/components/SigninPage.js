import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userAuthenticated } from '../app/authenticationSlice';
import { SignIn } from '../services/authentication';
import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await SignIn(dispatch, credentials);
    console.log(data);
    dispatch(userAuthenticated(data));

  
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        value={credentials.username}
        onChange={handleChange}
        placeholder="Username"
      />
      <input
        type="password"
        name="password"
        value={credentials.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignInPage;
