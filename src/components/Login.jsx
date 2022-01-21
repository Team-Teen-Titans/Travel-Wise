import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { MdAccountCircle } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  const onEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
  };

  const onPasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
  };
  const handleSubmit = () => {
    axios
      .post('/api/user/login', { email: email, password: password })
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          return navigate('/');
        }
        // sessionStorage.setItem('email', email);
        // sessionStorage.setItem('loggedIn', ******);
        // window.location.href = '/home';
      })
      .catch((err) => {
        console.log('error in axios in Login.jsx:', err);
        setLoginError(true);
      });
  };

  return (
    <div className='flex h-screen bg-indigo-700'>
      <div className='w-full max-w-xs m-auto bg-indigo-100 rounded p-5'>
        <header>
          <MdAccountCircle className='h-10 w-10 text-indigo-700 mx-auto mb-5' />
        </header>
        <form id='login'>
          <div>
            <label className='block mb-2 text-indigo-500'>
              Email:
              <input
                className='w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300'
                type='text'
                onChange={onEmailChange}
                required
              />
            </label>
          </div>
          <div>
            <label className='block mb-2 text-indigo-500'>
              Password:
              <input
                className='w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300'
                type='password'
                onChange={onPasswordChange}
                required
              />
            </label>
          </div>
        </form>
        <div>
          <button
            className='w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded'
            type='submit'
            onClick={handleSubmit}
          >
            Log In
          </button>
        </div>
        <footer>
          <p className='text-indigo-700 text-sm float-right'>
            Need to sign up? Click{' '}
            <Link to={'/signup'} className='hover:text-pink-700'>
              here
            </Link>{' '}
            to get started!
          </p>
          <div className='space-x-1'>
            <FcGoogle className='inline-block' />
            <a
              className='text-indigo-700 hover:text-pink-700 text-sm inline-block'
              href='/api/user/google'
            >
              Authenticate with Google
            </a>
          </div>
          {loginError && (
            <p className='text-center w-full text-pink-900 font-bold py-2 px-4 mb-6 rounded'>
              Invalid email or password
            </p>
          )}
        </footer>
      </div>
    </div>
  );
};

export default Login;
