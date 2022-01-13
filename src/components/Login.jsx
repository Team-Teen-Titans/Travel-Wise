import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const onEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
  };

  const onPasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
  };

  const loginreq = () => {
    axios
      .post('/user/login', { email: email, password: password })
      .then((res) => {
        console.log(res);
        sessionStorage.setItem('email', email);
        // sessionStorage.setItem('loggedIn', ******);
        // window.location.href= '/*****'
        //where do we want to route user after they have logged in
      })
      .catch((err) => {
        console.log(err);
        setLoginError(true);
      });
  };

  return (
    <div id='login'>
      <div className='login-form'>
        <p>Email</p>
        <input
          className='form-control login-input'
          type='text'
          placeholder='Enter email'
          onChange={onEmailChange}
          required
        />
        <p>Password</p>
        <input
          className='form-control login-input'
          type='password'
          placeholder='Password'
          onChange={onPasswordChange}
          required
        />
      </div>
      <button
        className='btn btn-primary'
        type='submit'
        onClick={loginreq}
      >
        Log In
      </button>
      {loginError && <p>Invalid email or password</p>}
      <p>Need to sign up? Click <Link id='signUp-link' to={'/signup'}>here</Link> to get started!</p>
    </div>
  );
};

export default Login;
