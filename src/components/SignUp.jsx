import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

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
          console.log('res in axios in SignUp.jsx:',res);
          if (res.status === 200) {
            return navigate('/');
          }
          // window.location.href = '/';
        })
        .catch((err) => {
          console.error('err in axios in SignUp.jsx:',err.response);
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
    <div className='signup-form'>
      <h2>Sign Up</h2>
      <form id='signup'>
        <label>
          First Name:
          <input
            className='border 1px rounded'
            type='text'
            name='firstName'
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Last Name:
          <input
            className='border 1px rounded'
            type='text'
            name='lastName'
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            className='border 1px rounded'
            type='text'
            name='email'
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            className='border 1px rounded'
            type='password'
            name='password'
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Confirm Password:
          <input
            className='border 1px rounded'
            type='password'
            name='confirmPassword'
            onChange={handleChange}
            required
          />
        </label>

        {/* <Link to={'/login'}>
          <button> Sign in instead </button>
        </Link> */}
        {/* option to add link back to login if user already has account */}

        <button
          className='btn btn-primary'
          type='submit'
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
      {/* {passwordError && <p>Passwords do not match. Please try again.</p>} */}
      {fieldsError && fieldsError}
    </div>
  );
};

export default SignUp;
