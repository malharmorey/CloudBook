import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../StyleSheets/navbar.css';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/NoteContext';

const Navbar = (props) => {
	const context = useContext(noteContext);
	const { clearUserNotesArray } = context;
	let navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem('token');
		navigate('/login');
		clearUserNotesArray();
		props.showAlert('Logged out successfully', 'success');
	};
	return (
		<>
			<nav id='navbar' className=' navbar  navbar-expand-lg '>
				<div className='container-fluid'>
					<Link className='navbar-brand  navTitle' to='/'>
						CloudBook
					</Link>

					<button
						className='navbar-toggler'
						type='button'
						data-bs-toggle='collapse'
						data-bs-target='#navbarSupportedContent'
						aria-controls='navbarSupportedContent'
						aria-expanded='false'
						aria-label='Toggle navigation'
					>
						<span className='navbar-toggler-icon'></span>
					</button>
					<div className='collapse navbar-collapse' id='navbarSupportedContent'>
						<ul className='navbar-nav me-auto mb-2 mb-lg-0'>
							<li className='nav-item'>
								<Link className='nav-link navLink' aria-current='page' to='/'>
									Home
								</Link>
							</li>
							<li className='nav-item'>
								<Link className='nav-link navLink' to='/about'>
									About
								</Link>
							</li>
						</ul>
						{!localStorage.getItem('token') ? (
							<div className='btnContainer'>
								<i className='fa-solid fa-right-to-bracket s'></i>
								<Link className='me-4 loginBtn' to='/login'>
									Login
								</Link>{' '}
							</div>
						) : (
							<div className='btnContainer'>
								<i className='fa-solid fa-right-to-bracket s'></i>
								<span className='me-4 loginBtn' onClick={handleLogout}>
									Logout
								</span>
							</div>
						)}
					</div>
				</div>
			</nav>
			<div className='underNavbar' style={{ height: '3.6rem' }}></div>
		</>
	);
};

export default Navbar;
