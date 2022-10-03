import React from 'react';
import '../StyleSheets/signup.css';
import { Link } from 'react-router-dom';

const SignUp = () => {
	return (
		<>
			<div className='loginContainer '>
				<div className='signUpCard '>
					<div className='loginCardHeader'>
						<p>SignUp Here</p>
					</div>
					<div className='loginCardBody'>
						<form>
							<div className='mb-3'>
								<label htmlFor='exampleInputName' className='form-label'>
									Full Name
								</label>
								<input
									type='name'
									className='form-control inputField'
									id='exampleInputName'
									aria-describedby='emailHelp'
									placeholder='John Doe'
								/>
							</div>
							<div className='mb-3'>
								<label htmlFor='exampleInputEmail1' className='form-label'>
									Username
								</label>
								<input
									type='email'
									className='form-control inputField'
									id='exampleInputEmail1'
									aria-describedby='emailHelp'
									placeholder='john@example.com'
								/>
								<div id='emailHelp' className='form-text'>
									We'll never share your email with anyone else.
								</div>
							</div>
							<div className='mb-3'>
								<label htmlFor='exampleInputPassword1' className='form-label'>
									Password
								</label>
								<input
									type='password'
									className='form-control inputField'
									id='exampleInputPassword1'
									placeholder='Password'
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
