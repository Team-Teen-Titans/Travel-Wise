import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      .post('****login route****', { email: email, password: password })
      .then((res) => {
        console.log(res);
        //sessions?
        //route to homepage? or saved trips?
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return <div></div>;
};

export default Login;
