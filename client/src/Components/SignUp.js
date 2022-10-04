import React, { useState } from 'react';
import '../StyleSheets/signup.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {
	const [credentials, setCredentials] = useState({
		name: '',
		email: '',
		password: '',
	});
	let navigate = useNavigate();

	const handleSignUp = async (e) => {
		e.preventDefault();
		const response = await fetch(`http://localhost:8000/api/auth/createUser`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: credentials.name,
				email: credentials.email,
				password: credentials.password,
			}),
		});
		const json = await response.json();
		if (json.success) {
			localStorage.setItem('token', json.authToken);
			navigate('/');
			props.showAlert('Account created sccessfully!', 'success');
		} else {
			// alert(
			if (json.message === undefined) {
				props.showAlert(
					'Password must contain atleast 1 lowerCase, 1 upperCase, 1 number and 1 symbol',
					'warning'
				);
			} else {
				props.showAlert(`${json.message}`, 'danger');
			}
		}
		setCredentials({
			name: '',
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
				<div className='signUpCard '>
					<div className='loginCardHeader'>
						<p>SignUp Here</p>
					</div>
					<div className='loginCardBody'>
						<form onSubmit={handleSignUp}>
							<div className='mb-3'>
								<label htmlFor='name' className='form-label'>
									Full Name
								</label>
								<input
									type='name'
									name='name'
									className='form-control inputField'
									id='name'
									aria-describedby='emailHelp'
									placeholder='John Doe'
									value={credentials.name}
									onChange={onChange}
									required
									minLength={4}
								/>
							</div>
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
								<div id='emailHelp' className='form-text'>
									We'll never share your email with anyone else.
								</div>
							</div>
							<div className='mb-3' data-tip='This is the text of the tooltip2'>
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
									minLength={5}
									required
									data-bs-toggle='tooltip'
									data-bs-placement='top'
									trigger='hover'
									title='Password must contain atleast 1 lowerCase, 1 upperCase, 1 number and 1 symbol'
								/>
							</div>
							<div className='mb-3 text-center'>
								<Link className='signupLink' to='/login'>
									Login Here
								</Link>
							</div>
							<button type='submit' className='btn loginPageBtn w-100'>
								Sign Up
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default SignUp;
