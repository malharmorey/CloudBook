import React, { useState } from 'react';
import '../StyleSheets/login.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
	const [credentials, setCredentials] = useState({ email: '', password: '' });
	let navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		const response = await fetch(`http://192.168.1.2:8000/api/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: credentials.email,
				password: credentials.password,
			}),
		});
		const json = await response.json();
		if (json.success) {
			localStorage.setItem('token', json.authToken);
			navigate('/');
			props.showAlert('Successfully loged In', 'success');
		} else {
			if (json.message === undefined) {
				props.showAlert('You have entered wrong credentials', 'warning');
			} else {
				props.showAlert(`${json.message}`, 'danger');
			}
		}
		setCredentials({
			email: '',
			password: '',
		});
	};

	const onChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};

	return (
		<>
			<div className='loginContainer '>
				<div className='loginCard '>
					<div className='loginCardHeader'>
						<p>Login Here</p>
					</div>
					<div className='loginCardBody'>
						<form onSubmit={handleLogin}>
							<div className='mb-3'>
								<label htmlFor='email' className='form-label'>
									Username
								</label>
								<input
									type='email'
									name='email'
									className='form-control inputField'
									id='email'
									aria-describedby='emailHelp'
									placeholder='john@example.com'
									value={credentials.email}
									onChange={onChange}
									required
								/>
							</div>
							<div className='mb-3'>
								<label htmlFor='password' className='form-label'>
									Password
								</label>
								<input
									type='password'
									name='password'
									className='form-control inputField'
									id='password'
									placeholder='Password'
									value={credentials.password}
									onChange={onChange}
									required
								/>
							</div>
							<div className='mb-3 text-center'>
								<Link className='signupLink' to='/signup'>
									Sign Up here
								</Link>
							</div>
							<button type='submit' className='btn loginPageBtn w-100'>
								Log In
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
