import React from 'react';
import '../StyleSheets/home.css';
import UpdateNotes from './UpdateNotes';
import NewNote from './NewNote';

const Home = () => {
	return (
		<>
			<h2 className='pageHeading'>Your Notes</h2>
			<UpdateNotes />
			<NewNote />
		</>
	);
};

export default Home;
