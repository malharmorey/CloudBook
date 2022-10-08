import React, { useContext, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import '../StyleSheets/navbar.css';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/NoteContext';

const Navbar = (props) => {
	const context = useContext(noteContext);
	const { clearUserNotesArray, userName } = context;
	let navigate = useNavigate();

	// Logging out current user and clearing user's notes array
	const handleLogout = () => {
		localStorage.removeItem('token');
		navigate('/login');
		clearUserNotesArray();
		props.showAlert('Logged out successfully', 'success');
	};

	// Collapsing navbar after selecting any NavLink
	const navButton = useRef(null);
	const linksContainerRef = useRef(null);
	function collapseNav() {
		navButton.current.classList.add('collapsed');
		linksContainerRef.current.classList.remove('show');
	}
	return (
		<>
			<nav id='navbar' className=' navbar  navbar-expand-lg '>
				<div className='container-fluid'>
					<NavLink
						className='navbar-brand  navTitle'
						to='/'
						onClick={collapseNav}
					>
						CloudBook
					</NavLink>

					<button
						ref={navButton}
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
					<div
						className='collapse navbar-collapse'
						id='navbarSupportedContent'
						ref={linksContainerRef}
					>
						<ul className='navbar-nav me-auto mb-2 mb-lg-0'>
							<li className='nav-item'>
								<NavLink
									to='/'
									className='nav-link navLink'
									onClick={collapseNav}
								>
									Home
								</NavLink>
							</li>
							<li className='nav-item'>
								<NavLink
									to='/about'
									className='nav-link navLink'
									onClick={collapseNav}
								>
									About
								</NavLink>
							</li>
						</ul>
						{!localStorage.getItem('token') ? (
							<div className='btnContainer'>
								<i className='fa-solid fa-right-to-bracket '></i>{' '}
								<NavLink className='me-4 loginBtn' to='/login'>
									Login
								</NavLink>
							</div>
						) : (
							<div className='btnContainer'>
								<div className='dropdown' style={{ display: 'inline-block' }}>
									<i className='fa-solid fa-user '></i>{' '}
									<span
										className='me-4 loginBtn dropdown-toggle'
										id='dropdownMenuLink'
										data-bs-toggle='dropdown'
										aria-expanded='false'
									>
										{userName ? userName : 'User'}
									</span>
									<ul
										className='dropdown-menu '
										aria-labelledby='dropdownMenuLink'
									>
										<li>
											<i className='fa-solid fa-right-from-bracket '></i>{' '}
											<p
												className='dropdown-item'
												onClick={handleLogout}
												data-bs-toggle='collapse'
												data-bs-target='.navbar-collapse.show'
											>
												Logout
											</p>
										</li>
									</ul>
								</div>
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
