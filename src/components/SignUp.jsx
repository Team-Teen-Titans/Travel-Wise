import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserPlus } from 'react-icons/fa';

const SignUp = () => {
  const [state, setstate] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  // const [passwordError, setPasswordError] = useState(false);
  const [fieldsError, setFieldsError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setstate({ ...state, [name]: value });
    console.log(state);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.password === state.confirmPassword) {
      console.log('password match --> submitted');

      axios
        .post('/api/user/signup', {
          first_name: state.firstName,
          last_name: state.lastName,
          email: state.email,
          password: state.password,
        })
        .then((res) => {
          console.log('res in axios in SignUp.jsx:', res);
          if (res.status === 200) {
            return navigate('/');
          }
          // window.location.href = '/';
        })
        .catch((err) => {
          console.error('err in axios in SignUp.jsx:', err.response);
          if (err.response.status === 400) {
            return setFieldsError('Please fill out all fields.');
          }
          if (err.response.status === 500) {
            return setFieldsError('This email is already taken.');
          }
        });
    } else {
      setFieldsError('Passwords do not match. Please try again.');
    }
  };

  return (
    <div className='flex h-screen bg-indigo-700'>
      <div className='w-full max-w-xs m-auto bg-indigo-100 rounded p-5'>
        {/* <h2>Sign Up</h2> */}
        <header>
          <FaUserPlus className='h-10 w-10 text-indigo-700 mx-auto mb-5' />
        </header>
        <form id='signup'>
          <div>
            <label className='block mb-2 text-indigo-500'>
              First Name:
              <input
                className='w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300'
                type='text'
                name='firstName'
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div>
            <label className='block mb-2 text-indigo-500'>
              Last Name:
              <input
                className='w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300'
                type='text'
                name='lastName'
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div>
            <label className='block mb-2 text-indigo-500'>
              Email:
              <input
                className='w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300'
                type='text'
                name='email'
                onChange={handleChange}
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
                name='password'
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div>
            <label className='block mb-2 text-indigo-500'>
              Confirm Password:
              <input
                className='w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300'
                type='password'
                name='confirmPassword'
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div>
            <button
              className='w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded'
              type='submit'
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
        <footer>
          <p className='text-indigo-700 text-sm float-right'>
            Already have an account? Click{' '}
            <Link to={'/login'} className='hover:text-pink-700'>
              here
            </Link>{' '}
            to login
          </p>
          <div className='text-center w-full text-pink-900 font-bold py-2 px-4 mb-6 rounded'>{fieldsError && fieldsError}</div>
        </footer>
      </div>
    </div>
  );
};

export default SignUp;
