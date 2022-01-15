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
	const handleSubmit = () => {
		axios
			.post('/api/user/login', { email: email, password: password })
			.then((res) => {
				console.log(res);
				// sessionStorage.setItem('email', email);
				// sessionStorage.setItem('loggedIn', ******);
				// window.location.href = '/home';
			})
			.catch((err) => {
				console.log(err);
				setLoginError(true);
			});
	};

	return (
		<div className='login-form'>
			<form id='login'>
				<label>
					Email:
					<input
						className='border 1px rounded'
						type='text'
						onChange={onEmailChange}
						required
					/>
				</label>
				<label>
					Password:
					<input
						className='border 1px rounded'
						type='password'
						onChange={onPasswordChange}
						required
					/>
				</label>
			</form>
			<button
				className='border 1px rounded'
				type='submit'
				onClick={handleSubmit}
			>
				Log In
			</button>
			<a href="/api/user/google">Authenticate with Google</a>
			{loginError && <p>Invalid email or password</p>}
			<p>
				Need to sign up? Click <Link to={'/signup'}>here</Link> to get started!
			</p>
		</div>
	);

};

export default Login;
