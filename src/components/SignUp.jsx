import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SignUp = () => {
  const [state, setstate] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [passwordMatch, setPasswordMatch] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setstate({ ...state, [id]: value });
    console.log(state);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.password === state.confirmPassword) {
      console.log('password match --> submitted');

      axios
        .post('/user/signup', {
          first_name: state.firstName,
          last_name: state.lastName,
          email: state.email,
          password: state.password,
        })
        .then((res) => {
          console.log(res);
          window.location.href = '/login';
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setPasswordMatch(true);
    }
  };

  return (
    <div id='signup'>
      <div className='signup-form'>
        <h2>Sign Up</h2>
        <form id='signup'>
          <label>
            First Name:
            <input
              className='form-control login-input'
              type='text'
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Last Name:
            <input
              className='form-control login-input'
              type='text'
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              className='form-control login-input'
              type='text'
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Password:
            <input
              className='form-control login-input'
              type='password'
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Confirm Password:
            <input
              className='form-control login-input'
              type='password'
              onChange={handleChange}
              required
            />
          </label>
          <button
            className='btn btn-primary'
            type='submit'
            onClick={handleSubmit}
          />
        </form>
      </div>
      {passwordMatch && <p>Passwords do not match. Please try again.</p>}
    </div>
  );
};

export default SignUp;
