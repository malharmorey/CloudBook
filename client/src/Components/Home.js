import React from 'react';
import '../StyleSheets/home.css';
import UpdateNotes from './UpdateNotes';
import NewNote from './NewNote';
import ScrollToTop from 'react-scroll-to-top';
import ScrollToTopBtn from './ScrollToTopBtn';

const Home = (props) => {
	document.title = `CloudBook | ${props.title}`;
	return (
		<>
			<h2 className='pageHeading'>Your Notes 📝</h2>
			<UpdateNotes />
			<ScrollToTop
				smooth
				component={<ScrollToTopBtn />}
				style={{
					// boxShadow: 'none',
					// WebkitBoxShadow: 'none',
					// MozWindowShadow: 'none',
					position: 'fixed !important',
					bottom: '7rem',
					right: '3rem',
					background: 'transparent',
				}}
			/>
			<NewNote />
		</>
	);
};

export default Home;
