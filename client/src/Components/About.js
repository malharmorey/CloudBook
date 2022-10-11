import React from 'react';
import '../StyleSheets/about.css';
import { Link } from 'react-router-dom';

const About = (props) => {
	document.title = `CloudBook | ${props.title}`;
	return (
		<>
			<div className='aboutCard '>
				<div className='aboutCardBody'>
					<h2 className='aboutCardTitle'>About </h2>
					<p className='card-text aboutCardText'>
						<span>CloudBook</span> is a personal note-taking📝 application to
						store our thoughts💬, memories💌, life lessons, stories and many
						more directly to the cloud☁️. It is secure🔒, fast⚡️ and
						reliable🌞. Sign Up{' '}
						<Link className='signupLink' to='/signup'>
							here
						</Link>{' '}
						for free🎉 and start writing notes its fun!
						<p className='mt-3'>Made 👨🏻‍💻 with ❤️ by Malhar.</p>
					</p>
				</div>
			</div>
		</>
	);
};

export default About;
