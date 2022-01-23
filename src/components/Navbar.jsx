import axios from 'axios';
import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from './App';

function NavBar({ setRefetchAuth }) {
	const isUserLoggedIn = useContext(AuthContext);

	const handleLogOut = async () => {
		axios.post('/api/user/logout');
		setRefetchAuth((prev) => ++prev);
	};

	return (
		<>
			<nav className='flex items-center justify-between flex-wrap bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400  p-6'>
				<div className='flex items-center flex-shrink-0 text-white mr-6'>
					<Link to='/' className='font-semibold text-xl tracking-tight'>
						travel wise.
					</Link>
				</div>
				<div className='block lg:hidden'>
					<button className='flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white'>
						<svg
							className='fill-current h-3 w-3'
							viewBox='0 0 20 20'
							xmlns='http://www.w3.org/2000/svg'
						>
							<title>Menu</title>
							<path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
						</svg>
					</button>
				</div>
				<div className='w-full block flex-grow lg:flex lg:items-end lg:w-auto text-center'>
					<div className='justify-between text-sm lg:flex-grow text-right'>
						<Link
							to='/'
							className='block mt-4 lg:inline-block lg:mt-0 text-white hover:text-green-300 mr-5 ml-5'
						>
							Home
						</Link>
						<Link
							to='/covid-update'
							className='block mt-4 lg:inline-block lg:mt-0 text-white hover:text-green-300 mr-5 ml-5'
						>
							COVID Update
						</Link>
						{isUserLoggedIn && (
							<>
								<Link
									to='/my-trips'
									className='block mt-4 lg:inline-block lg:mt-0 text-white hover:text-green-300 mr-5 ml-5'
								>
									My Trips
								</Link>
								<Link
									to='/profile'
									className='block mt-4 lg:inline-block lg:mt-0 text-white hover:text-green-300 mr-5 ml-5'
								>
									{/* {`Welcome, ${isUserLoggedIn.first_name} ${isUserLoggedIn.last_name}`} */}
									{`Welcome, ${isUserLoggedIn.first_name} ${isUserLoggedIn.last_name}`}
								</Link>
								<Link
									to='/'
									onClick={handleLogOut}
									className='block mt-4 lg:inline-block lg:mt-0 text-white hover:text-green-300 mr-5 ml-5'
								>
									Log Out
								</Link>
							</>
						)}
						{!isUserLoggedIn && (
							<>
								<Link
									to='/login'
									className='block mt-4 lg:inline-block lg:mt-0 text-white hover:text-green-300 mr-5 ml-5'
								>
									Login
								</Link>
								<Link
									to='/signup'
									className='block mt-4 lg:inline-block lg:mt-0 text-white hover:text-green-300 mr-5 ml-5'
								>
									Sign up
								</Link>
							</>
						)}
					</div>
				</div>
				<hr />
			</nav>
			<Outlet />
		</>
	);
}

export default NavBar;
