import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userAuthenticated } from '../app/authenticationSlice';
import { SignIn } from '../services/authentication';
import { useNavigate } from 'react-router-dom';
import '../css part/SignIn.css'; 

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
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          placeholder="Username"
          className="input"
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
          className="input"
        />
        <button type="submit" className="button">Sign In</button>
        <button type="button" className="button">Sign Up</button>
        <button type="button" className="button">AI Assistant</button>
      </form>
    </div>
  );
};

export default SignInPage;
